"use client";

import { Video } from "@imagekit/next";
import { useState } from "react";
import FileUpload from "./fileUpload";

interface VideoData {
  url: string;
  name: string;
  fileId: string;
}

export default function VideoComponent() {
  const [uploadedVideos, setUploadedVideos] = useState<VideoData[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (response: any) => {
    setIsUploading(false);
    setUploadProgress(0);
    
    // Add the new video to the list of uploaded videos
    const newVideo: VideoData = {
      url: response.url,
      name: response.name,
      fileId: response.fileId
    };
    
    setUploadedVideos([...uploadedVideos, newVideo]);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
    setIsUploading(progress > 0 && progress < 100);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
        <FileUpload 
          onSuccess={handleUploadSuccess} 
          onProgress={handleUploadProgress} 
          fileType="video" 
        />
      </div>

      {uploadedVideos.length > 0 && (
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedVideos.map((video, index) => (
              <div key={video.fileId || index} className="border rounded-lg overflow-hidden">
                <Video
                  urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
                  src={video.url}
                  width={500}
                  height={500}
                  controls={true}
                  className="w-full"
                />
                <div className="p-2">
                  <p className="font-medium truncate">{video.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}