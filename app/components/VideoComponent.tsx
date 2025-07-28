"use client";

import { Video } from "@imagekit/next";
import { useState } from "react";
import FileUpload from "./FileUpload";

interface VideoData {
  url: string;
  name: string;
  fileId: string;
}

export default function VideoComponent(props: { style?: React.CSSProperties }) {
  const [uploadedVideos, setUploadedVideos] = useState<VideoData[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadSuccess = (response: any) => {
    // setIsUploading(false);
    setUploadProgress(0);

    // Add the new video to the list of uploaded videos
    const newVideo: VideoData = {
      url: response.url,
      name: response.name,
      fileId: response.fileId,
    };

    setUploadedVideos([...uploadedVideos, newVideo]);
  };

  const handleUploadProgress = (uploadProgress: number) => {
    setUploadProgress(uploadProgress);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border p-4 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Upload Video</h2>
        <FileUpload
          onSuccess={handleUploadSuccess}
          onProgress={handleUploadProgress}
          fileType="video"
        />
      </div>
      {/* Show pop up when video/image is uploaded !! shifting this comp to main page */}

      {uploadedVideos.length > 0 && (
        <div className="rounded-lg border bg-red-200 p-4 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Your Videos</h2>
          <div className="grid grid-cols-1 gap-4 divide-y md:grid-cols-2 lg:grid-cols-3">
            {uploadedVideos.map((video, index) => (
              <div
                key={video.fileId || index}
                className="overflow-hidden rounded-md border"
              >
                <div className="p-1">
                  <Video
                    // urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
                    // urlEndpoint="https://ik.imagekit.io/sfzdeip2u"
                    src={video.url}
                    width={440}
                    height={440}
                    controls={true}
                  />
                  <p className="my-1 truncate font-medium">{video.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
