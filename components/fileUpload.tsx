"use client"; // This component must be a client component

import { upload } from "@imagekit/next";
import React, { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<String | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const videoFileTypes = ["video/mp4", "video/x-msvideo", "video/webm"];
  const imageFileTypes = ["image/jpeg", "image/png", "image/webp"];

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/*")) {
        setError("please upload a valid video file");
      }
      // ----------------------- OR ------------------------------------ //
      // if (!videoFileTypes.includes(file.type)){
      //     setError("please upload a valid video file")
      // }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100MB");
      }
      return true;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;
    setProgress(0);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const { token, expire, signature } = auth.authenticationParameters;

      const res = await upload({
        file,
        fileName: file.name, // Optionally set a custom file name
        // Authentication parameters
        signature,
        expire,
        token,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        // Progress callback to update upload progress state
        onProgress: (event) => {
            if(event.lengthComputable && onProgress){
                const progressValue = Math.round(event.loaded / event.total * 100);
                setProgress(progressValue);
                onProgress(progressValue);
            }
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      onSuccess(res)
    } catch (error) {
        console.error("upload failed", error);
    } finally {
        setProgress(0);
    }
  };
  return (
    <>
      <input 
        className="cursor-pointer bg-[#1576ff] text-white rounded-md px-4 py-2"
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
      <br />
      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{progress}% uploaded</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default FileUpload;
