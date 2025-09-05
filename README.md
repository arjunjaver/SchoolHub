
# SchoolHub

A simple **Next.js + MySQL(freesqldatabase) + Cloudinary** application to manage schools.  
It allows you to **add, view, and delete schools** with image uploads stored in Cloudinary.

## Features

- Add new schools with details (name, address, city, state, contact, email).
- Upload and display school images (stored in Cloudinary).
- View all schools from the database.
- Delete schools (removes record).
- Form validation (e.g., contact number must be exactly 10 digits).

## Tech Stack


- **Frontend**: Next.js (App Router), Tailwind CSS  
- **Backend**: Next.js API routes  
- **Database**: MySQL(freesqldatabase) 
- **Storage**: Cloudinary  

## Setup Instructions


### Prerequisites

Ensure you have the following installed:

- Node.js (>=14)

- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/arjunjaver/SchoolHub
cd SchoolHub
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:
Create a .env.local file in the root and add:
```
MYSQL_HOST=your-host-name
MYSQL_USER=your-user-name
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=your-database-name

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Run the development server:
```
npm run dev
```
App will be running on http://localhost:3000


## Database Schema

Table: `schools`

| Column   | Type     | Description                 |
|----------|----------|-----------------------------|
| id       | int (PK) | Auto-increment primary key  |
| name     | text     | School name                 |
| address  | text     | School address              |
| city     | text     | City                        |
| state    | text     | State                       |
| contact  | varchar  | Contact number (10 digits)  |
| email_id | varchar  | Email address               |
| image    | text     | Cloudinary image URL        |
