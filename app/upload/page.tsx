"use client";

import { Uploader } from "../components/Upload/Uploader";
import { useState } from "react";
import { uploadFiles } from "../utils/upload";

const Upload = () => {
  const [progress, setProgress] = useState<number>(0); // State to track the progress

  const handleFileUpload = async (acceptedFiles: File[]) => {
    try {
      await uploadFiles({
        acceptedFiles,
        customName: "myCustomFile", // or get from input
        onProgress: (progress: number) => {
          setProgress(progress); // Update the progress state
        },
      });
    } catch (error) {
      console.log("Upload failed", error);
    } finally {
      // Reset progress to 0 when upload completes (success or failure)
      setProgress(0);
    }
  };
  return (
    // <div className="flex min-h-screen w-fit min-w-screen items-center justify-center">
    <div className="flex h-screen max-w-[100wh] items-center justify-center bg-amber-50">
      {/* <div className="bg-[#cd3a3a]">
        hello Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis vel
        laboriosam, possimus reiciendis dolorum corrupti aut? Corporis nostrum
        minima enim voluptatibus aperiam, exercitationem velit vel minus ipsum,
        distinctio, eum qui!
      </div> */}
      <div className="">
        {" "}
        <Uploader className="rounded-lg" onDrop={handleFileUpload} />
        <br />
      </div>
      {progress > 0 && (
        <div className="mt-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }} // Dynamic width based on progress state
            ></div>
          </div>
          <p className="mt-1 text-sm">{progress}% uploaded</p>
        </div>
      )}
    </div>
  );
};

export default Upload;
