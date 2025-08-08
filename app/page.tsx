"use client";

import { buildSrc, Video } from "@imagekit/next";
import { useSession, signIn } from "next-auth/react";
import { apiClient } from "./utils/api-client";
import { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import { motion } from "motion/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.getVideos();
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  if (status === "loading") {
    return (
      <p className="flex h-screen items-center justify-center text-center text-neutral-600">
        Loading...
      </p>
    );
  }
  return (
    <div className="h-[200vh] bg-neutral-100 p-4">
      {session ? (
        <>
          {videos.length > 0 && (
            <div className="rounded-lg">
              <h2 className="mb-4 pt-10 text-center text-2xl font-bold">
                Your Videos
              </h2>
              <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, index) => (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    // whileHover={{
                    //   scale: 1.03,
                    //   transition: {
                    //     duration: 0.3,
                    //     ease: "easeInOut",
                    //   },
                    // }}
                    transition={{
                      duration: 0.35,
                      // delay: index * 0.2,
                      delay: index * 0.12,
                      ease: "easeInOut",
                    }}
                    key={video._id?.toString() || index}
                    className="overflow-hidden rounded-md bg-neutral-50 transition duration-200 hover:scale-[1.02]"
                  >
                    <div className="p-1">
                      <Video
                        className="aspect-[16/9] rounded-b-lg bg-neutral-50 shadow-xl"
                        src={video.videoUrl}
                        width={690}
                        height={690}
                        // width={video.transformation?.width}
                        // height={video.transformation?.height}
                        controls={video.controls}
                        poster={buildSrc({
                          urlEndpoint: "https://ik.imagekit.io/sfzdeip2u",
                          src: `${video.videoUrl}/ik-thumbnail.jpg?tr=so-10`,
                        })}
                      />
                    </div>
                    <p className="my-1 flex truncate pl-2 font-medium">
                      {video.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-4xl text-red-500">
          <p>You are not authorised for this page</p>
          <button onClick={async () => await signIn()}>Sign in</button>
        </div>
      )}
    </div>
  );
}
