import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDatabase } from "@/app/utils/db";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        await connectDatabase();
        const user = await User.findOne({ email });
        return NextResponse.json({ user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}