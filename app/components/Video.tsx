"use client";

import { Video } from "@imagekit/next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow transition-all duration-300 hover:shadow-lg">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="group relative w-full">
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: "9/16" }}
          >
            <Video
              className="h-full w-full object-cover"
              path={video.videoUrl}
              src={`/videos/${video._id}`}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video?.controls}
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="transition-opacity hover:opacity-80"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-base-content/70 line-clamp-2 text-sm">
          {video.description}
        </p>
      </div>
    </div>
  );
}
