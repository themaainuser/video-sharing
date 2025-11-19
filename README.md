## Fullstack Video Upload & Management Platform (Next.js + ImageKit + MongoDB)

This project is a full-stack video upload, storage, and management application built with Next.js 15, NextAuth, ImageKit, MongoDB, TailwindCSS, and Docker.
It provides authentication, secure video uploads, real-time progress tracking, video listing, and a clean modern UI using shadcn/ui components.

The platform demonstrates how to integrate ImageKit for large file uploads, manage users with NextAuth, and persist video metadata using MongoDB.

### Authentication

Email + Password login (Credentials Provider), GitHub OAuth login, Google OAuth login, JWT-based session handling, Route protection via NextAuth middleware, Video Upload & Storage

#### Upload videos directly to ImageKit with:

Upload progress

Custom file naming

Size/type validation

Abort handling (client-side)

Store metadata in MongoDB (title, URL, transformations)

### Video Management

Fetch all uploaded videos

Display video grid with thumbnails

Serve video previews

Auto-generated thumbnails (via ImageKit URL params)

### User System

Register, login, logout

User profile page

Fetch/update stored user details

Password hashing with bcrypt

Protected pages: /profile, /upload

### UI & Styling

TailwindCSS 4

shadcn/ui components

Responsive modern layout

Motion animations (framer-motion-based)

### Docker Support 🐳 Includes

- Dockerfile to containerize the Next.js app
- docker-compose.yml for MongoDB container
- Named Mongo volume for persistent storage

### Technology Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4, Motion (Framer Motion)
- Database: MongoDB (Mongoose ODM)
- Authentication: NextAuth.js
- Media Service: ImageKit.io
- Containerization: Docker (for local database)

### 📂 Project Structure Overview

```
app/
 ├─ api/
 │   ├─ auth/
 │   │   ├─ register/route.ts
 │   │   ├─ imagekit-auth/route.ts
 │   │   ├─ video/route.ts
 │   │   ├─ user/...
 │   │   └─ [...nextauth]/route.ts
 │
 ├─ components/
 │   ├─ Navbar/
 │   ├─ Upload/
 │   ├─ ui/...
 │   ├─ FileUpload.tsx
 │   └─ LoginForm.tsx
 │
 ├─ utils/
 │   ├─ auth.ts
 │   ├─ api-client.ts
 │   ├─ upload.ts
 │   └─ db.ts
 │
models/
 ├─ User.ts
 └─ Video.ts

dockerfile
docker-compose.yml
tailwind.config.js
components.json
package.json
```

## ⚙️ Environment Variables

Create a .env.local file with:

```
MONGODB_URI="your_mongo_connection_string"
```

## NextAuth

```
NEXTAUTH_SECRET=your_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## ImageKit

```
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/your_endpoint
```

```📦 Installation & Running Locally
1. Install dependencies
npm install

2. Run the dev server
npm run dev

3. Build for production
npm run build
npm start

🐳 Running with Docker
Start MongoDB
docker-compose up -d

Build the Next.js image
docker build -t video-app .

Run the container
docker run -p 3000:3000 video-app
```

## 🔗 API Endpoints Overview

### Auth

| Method   | Endpoint                  | Description       |
| -------- | ------------------------- | ----------------- |
| POST     | `/api/auth/register`      | Register new user |
| POST     | `/api/auth/user`          | Fetch user info   |
| POST     | `/api/auth/user/update`   | Update user email |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handlers |

### ImageKit

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| GET    | `/api/auth/imagekit-auth` | Get upload signature |

### Videos

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/auth/video` | Fetch all videos      |
| POST   | `/api/auth/video` | Upload video metadata |

## 🧪 Testing Credentials

- The login page includes an example test account for quick access.

## 📄 Additional Notes

- The project uses middleware to restrict private routes.
- Video metadata is stored in MongoDB while video files are stored on ImageKit CDN.
- The UI is fully responsive and styled using TailwindCSS and shadcn components.
- Uploading supports drag-and-drop as well as file input.
