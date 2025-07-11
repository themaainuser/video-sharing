import Video, { IVideo } from "@/models/Video";
import { authOptions } from "@/app/utils/auth";
import { connectDatabase } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDatabase()
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean()

        if (!videos || videos.length === 0) {
            return NextResponse.json({
                message: "No videos found",
            }, {
                status: 404,
            })
        }
        return NextResponse.json(videos)
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            error: "Failed to fetch Videos",
        }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) { return NextResponse.json({ error: "Unauthorized", },
            { status: 401, })
        }
        await connectDatabase()
        const body: IVideo = await req.json()
        if (!body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl) {
            return NextResponse.json(
                { error: "Missing Fields", },
                { status: 400, }
            )
        }
        const videoData = {
            ...body,
            controls: body?.constrols ?? true,
            transformation: {
                height: body?.transformation?.height ?? 1080,
                width: body?.transformation?.width ?? 1920,
                fps: body?.transformation?.fps ?? 30,
                quality: body.transformation?.quality ?? 100,
            },
        }
        const newVideo = await Video.create(videoData)
        return NextResponse.json(newVideo);

    }
    catch (error) {
        return NextResponse.json({
            error: "failed to create"
        }, { status: 500 });
    }
}