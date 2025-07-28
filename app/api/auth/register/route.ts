import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/app/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }
        await connectDatabase()
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password: hashedPassword,
        })
        return NextResponse.json({
            email: user.email,
        }, { status: 201 })
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error");
    }
}
