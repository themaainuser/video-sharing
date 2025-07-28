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
  const [customName, setCustomName] = useState("");

  const videoFileTypes = ["video/mp4", "video/x-msvideo", "video/webm"];
  const imageFileTypes = ["image/jpeg", "image/png", "image/webp"];

  const validateVideoFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
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
  const validateImageFile = (file: File) => {
    if (fileType === "image") {
      if (!file.type.startsWith("image/")) {
        setError("please upload a valid image file");
      }
      // ----------------------- OR ------------------------------------ //
      // if (!imageFileTypes.includes(file.type)){
      //     setError("please upload a valid image file")
      // }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
      }
      return true;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateVideoFile(file)) return;
    setProgress(0);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      console.log(auth);

      const { token, expire, signature } = auth.authenticationParameters;
      const extension = file.name.split(".").pop();
      const finalName = (customName.trim() || "untitled") + "." + extension;

      const res = await upload({
        file,
        fileName: finalName, // Optionally set a custom file name
        // Authentication parameters
        signature,
        expire,
        token,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        // Progress callback to update upload progress state
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const progressValue = Math.round(
              (event.loaded / event.total) * 100,
            );
            setProgress(progressValue);
            onProgress(progressValue);
          }
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      onSuccess(res);
      console.log("Upload result:", res);
      console.log("Uploaded video URL:", res.url);
    } catch (error) {
      console.error("upload failed", error);
    } finally {
      setProgress(0);
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          className="w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Enter custom file name (without extension)"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          disabled={progress > 0}
        />
      </div>
      <input
        className="cursor-pointer rounded-md bg-[#1576ff] px-4 py-2 text-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
        type="file"
        accept={
          fileType === "video"
            ? videoFileTypes.join(",")
            : imageFileTypes.join(",")
        }
        onChange={handleFileChange}
      />
      <br />
      {progress > 0 && (
        <div className="mt-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm">{progress}% uploaded</p>
        </div>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </>
  );
};

export default FileUpload;
