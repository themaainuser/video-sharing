// File: app/api/upload-auth/route.ts
// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"
import dotenv from "dotenv"

dotenv.config()

export async function GET() {
  try {
    const authenticationParameters = await getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      // expire: 30 * 60, // 30 minutes
      // token: "random-token", // Should be unique per request in production
    });

    return Response.json({
      authenticationParameters,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
