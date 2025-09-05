import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";

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
    const image = formData.get("image");

    let imageUrl = null;
    let publicId = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary (wrapped in Promise)
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "schoolImages" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    await db.execute(
  "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
  [name, address, city, state, contact, email_id, imageUrl]
);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/schools error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

//  GET - Fetch Schools 
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

//  DELETE - Delete School 
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await db.execute("DELETE FROM schools WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "School deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/schools error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

