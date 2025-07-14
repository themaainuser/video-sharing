"use client";

import { Video } from "@imagekit/next";
import { useState } from "react";
import FileUpload from "./FileUpload";

interface VideoData {
  url: string;
  name: string;
  fileId: string;
}

export default function VideoComponent() {
  const [uploadedVideos, setUploadedVideos] = useState<VideoData[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (response: any) => {
    // setIsUploading(false);
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
    // setIsUploading(progress > 0 && progress < 100);
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

// "use client";

// import { Video } from "@imagekit/next";
// import { useState } from "react";
// import FileUpload from "./FileUpload";

// interface VideoData {
//   url: string;
//   name: string;
//   fileId: string;
// }

// export default function VideoComponent() {
//   const [uploadedVideos, setUploadedVideos] = useState<VideoData[]>([]);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [error, setError] = useState<string | null>(null);

//   const handleUploadSuccess = (response: any) => {
//     setUploadProgress(0);
//     const newVideo: VideoData = {
//       url: response.url,
//       name: response.name,
//       fileId: response.fileId,
//     };
//     setUploadedVideos([...uploadedVideos, newVideo]);
//   };

//   const handleUploadProgress = (progress: number) => {
//     setUploadProgress(progress);
//   };

//   const handleUploadError = (error: any) => {
//     setError("An error occurred while uploading your video.");
//     console.error(error);
//   };

//   const handleRemoveVideo = (fileId: string) => {
//     setUploadedVideos(uploadedVideos.filter(video => video.fileId !== fileId));
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="p-4 border rounded-lg shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
//         <FileUpload 
//           onSuccess={handleUploadSuccess} 
//           onProgress={handleUploadProgress} 
//           onError={handleUploadError}
//           fileType="video" 
//         />
//         {uploadProgress > 0 && uploadProgress < 100 && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
//             <div
//               className="bg-primary h-2.5 rounded-full"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         )}
//         {error && <div className="text-red-500">{error}</div>}
//       </div>

//       {uploadedVideos.length > 0 && (
//         <div className="p-4 border rounded-lg shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {uploadedVideos.map((video, index) => (
//               <div key={video.fileId || index} className="border rounded-lg overflow-hidden">
//                 <Video
//                   urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
//                   src={video.url}
//                   width={500}
//                   height={500}
//                   controls={true}
//                   className="w-full"
//                 />
//                 <div className="p-2">
//                   <p className="font-medium truncate">{video.name}</p>
//                   <button
//                     onClick={() => handleRemoveVideo(video.fileId)}
//                     className="text-red-500 mt-2"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
