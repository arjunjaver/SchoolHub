import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs";
import path from "path";

// POST - Add School
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    let imageName = null;

    if (imageFile && imageFile.size > 0) {
      // Convert file to Buffer
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const ext = path.extname(imageFile.name);
      imageName = `${Date.now()}${ext}`;

      // Ensure upload directory exists
      const uploadDir = path.join(process.cwd(), "public/schoolImages");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      // Save file
      const filePath = path.join(uploadDir, imageName);
      fs.writeFileSync(filePath, buffer);
    }

    // Insert into database
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, imageName]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/schools error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch Schools
export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM schools");
    return NextResponse.json({ success: true, schools: rows });
  } catch (error) {
    console.error("GET /api/schools error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    // 1. Find school record to get image name
    const [rows] = await db.execute("SELECT image FROM schools WHERE id = ?", [id]);
    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "School not found" },
        { status: 404 }
      );
    }

    const imageName = rows[0].image;

    // 2. Delete the school record
    await db.execute("DELETE FROM schools WHERE id = ?", [id]);

    // 3. Delete image file if it exists
    if (imageName) {
      const imagePath = path.join(process.cwd(), "public", "schoolImages", imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`🗑️ Deleted image: ${imagePath}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/schools error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}