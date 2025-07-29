"use client";

import Header from "@/app/components/Header";
import VideoComponent from "./components/VideoComponent";
import { Video } from "@imagekit/next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const uploadedVideos = [
    "https://ik.imagekit.io/sfzdeip2u/Nayak_Amrish_Puri_GIF_-_Nayak_Amrish_Puri_Chupp_-_Discover___Share_GIFs__nayak-amrish-puri-chupp-bolti-band-mani-nahi-bolunga-gif-18754360__AyGkRKMkB1.mp4?updatedAt=1753465309007",
    "https://ik.imagekit.io/sfzdeip2u/Video_Ready_Sparkling_Toast_V9kfvCT4KF.mp4?updatedAt=1753426426089",
    "https://ik.imagekit.io/sfzdeip2u/Video_Ready_Sparkling_Toast_V9kfvCT4KF.mp4?updatedAt=1753426426089",
    "https://ik.imagekit.io/sfzdeip2u/Video_Ready_Toast_and_Ruby_SZMwoAVaKu.mp4?updatedAt=1753294343194",
    "https://ik.imagekit.io/sfzdeip2u/Video_Ready_Toast_and_Ruby_SZMwoAVaKu.mp4?updatedAt=1753294343194",
    "https://ik.imagekit.io/sfzdeip2u/Video_Ready_Toast_and_Ruby_SZMwoAVaKu.mp4?updatedAt=1753294343194",
  ];

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  return (
    <>
      {session ? (
        <>
          <Header />
          {/* TEST */}
          {uploadedVideos.length > 0 && (
            <div className="rounded-lg">
              <h2 className="mt-2 mb-4 text-center text-2xl font-bold">
                Your Videos
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {uploadedVideos.map((video, index) => (
                  <div
                    key={video || index}
                    className="overflow-hidden rounded-md border bg-amber-200 shadow-md"
                  >
                    <div className="p-2">
                      <Video
                        // urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
                        // urlEndpoint="https://ik.imagekit.io/sfzdeip2u"
                        src={video}
                        width={690}
                        height={690}
                        controls={true}
                      />
                    </div>
                    <p className="my-1 flex justify-center truncate font-medium">{`video.name`}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* <div className="bg-red-500">
            <Video
              // urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
              // urlEndpoint="https://ik.imagekit.io/sfzdeip2u"
              src={
                "https://ik.imagekit.io/sfzdeip2u/Nayak_Amrish_Puri_GIF_-_Nayak_Amrish_Puri_Chupp_-_Discover___Share_GIFs__nayak-amrish-puri-chupp-bolti-band-mani-nahi-bolunga-gif-18754360__AyGkRKMkB1.mp4?updatedAt=1753465309007"
              }
              width={440}
              height={440}
              controls={true}
            />
          </div> */}
        </>
      ) : (
        <div className="text-center text-4xl text-red-500">
          <p>You are not authorised for this page</p>
          <button onClick={async () => await signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
}
