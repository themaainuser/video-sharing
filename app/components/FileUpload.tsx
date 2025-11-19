/* eslint-disable */
"use client"; // Marks this as a client-side component

import { upload } from "@imagekit/next";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { apiClient } from "../utils/api-client";

interface FileUploadProps {
  onSuccess: (res: any) => void; // Callback function when upload succeeds, receives the upload result
  onProgress: (progress: number) => void; // Callback function to report upload progress
  fileType?: "image" | "video"; // Optional prop to specify the type of file to upload
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const videoFileTypes = ["video/*"];
  const imageFileTypes = ["image/*"];

  // Function to validate video files based on type and size
  const validateVideoFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        toast.error("please upload a valid video file");
      }
      // ----------------------- OR ------------------------------------ //
      // if (!videoFileTypes.includes(file.type)){
      //     setError("please upload a valid video file")
      // }

      if (file.size > 100 * 1024 * 1024) {
        toast.error("File size must be less than 100MB");
        return false;
      }
      return true;
    }
  };
  // const validateImageFile = (file: File) => {
  //   if (fileType === "image") {
  //     // Check if file type starts with "image/"
  //     if (!file.type.startsWith("image/")) {
  //       setError("please upload a valid image file");
  //     }
  //     // ----------------------- OR ------------------------------------ //
  //     // Alternative validation method using the predefined imageFileTypes array
  //     // if (!imageFileTypes.includes(file.type)){
  //     //     setError("please upload a valid image file")
  //     // }
  //     // Check if file size exceeds 10MB
  //     if (file.size > 10 * 1024 * 1024) {
  //       setError("File size must be less than 10MB");
  //     }
  //     return true;
  //   }
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateVideoFile(file)) return;
    // Reset progress to 0 at the start of a new upload
    setProgress(0);
    setError(null);

    try {
      // Fetch authentication parameters from the server for ImageKit
      console.log("fetching auth params");
      const authRes = await fetch("/api/auth/imagekit-auth", {
        method: "GET",
      });
      const auth = await authRes.json();
      console.log(auth + "auth log");

      if (!authRes.ok) {
        throw new Error(
          auth.message || "Failed to fetch authentication parameters",
        );
      }

      const { token, expire, signature } = auth.authenticationParameters;

      const extension = file.name.split(".").pop();
      const finalName = (customName.trim() || "untitled") + "." + extension;

      // Call the ImageKit upload function with all required parameters
      const res = await upload({
        file,
        fileName: finalName,
        signature,
        expire,
        token,
        publicKey: auth.publicKey!,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const progressValue = Math.round(
              (event.loaded / event.total) * 100,
            );
            setProgress(progressValue);
            onProgress(progressValue);
            if (progressValue === 100) {
              toast.success("Video Uploaded successfully");
            }
          }
        },
        // Abort signal to allow cancellation of the upload if needed
        abortSignal: abortController.signal,
      });

      // Call the onSuccess callback passed as prop with the upload result
      onSuccess(res);
      await apiClient.createVideos({
        title: customName || finalName,
        videoUrl: res.url!,
        thumbnailUrl: "not generated", // Optional: add this if you generate thumbnails
        description: "no description", // Optional: add UI for this later
        controls: true,
        transformation: {
          height: 1080,
          width: 1920,
          quality: 100,
        },
      });
      // Log upload result and URL for debugging
      console.log("Upload result:", res);
      console.log("Uploaded video URL:", res.url);
    } catch (error) {
      // Log any errors that occur during the upload process
      toast.error("upload failed");
    } finally {
      // Reset progress to 0 when upload completes (success or failure)
      setProgress(0);
    }
  };

  return (
    <>
      <Toaster richColors={true} />
      {/* Custom filename input field */}
      {fileType === "video" && (
        <div>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus:ring-neutral-600 focus:outline-none"
            placeholder="Enter custom file name (without extension)"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            disabled={progress > 0} // Disable input during upload
          />
        </div>
      )}

      <input
        className="mt-4 cursor-pointer rounded-md bg-[#1576ff] px-4 py-2 text-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
        type="file"
        accept={
          // Set accepted file types based on fileType prop
          fileType === "video"
            ? videoFileTypes.join(",") // Join video MIME types with commas for accept attribute
            : imageFileTypes.join(",") // Join image MIME types with commas for accept attribute
        }
        onChange={handleFileChange} // Call handleFileChange when a file is selected
      />
      <br />
      {progress > 0 && (
        <div className="mt-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-red-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }} // Dynamic width based on progress state
            ></div>
          </div>
          <p className="mt-1 text-sm">{progress}% uploaded</p>
        </div>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </>
  );
};

// Export the FileUpload component as the default export
export default FileUpload;
