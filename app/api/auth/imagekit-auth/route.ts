// File: app/api/auth/imagekit-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"
import dotenv from "dotenv"

dotenv.config()

export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      // expire: 30 * 60, // 30 minutes
      // token: "random-token", // Should be unique per request in production
    });

    if (!authenticationParameters) {
      throw new Error("Failed to fetch authentication parameters");
    }

    console.log(authenticationParameters + "auth log");

    return Response.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    }, {
      status: 200,
    });

  } catch (error) {
    console.log("ImageKit Auth Error:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
