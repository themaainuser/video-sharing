// import { VideoFormData } from "@/app/utils/api-client";
// import { Video } from "@imagekit/next";
// import { useState } from "react";

// const ShowVideo = () => {
//   const [uploadedVideos, setUploadedVideos] = useState<VideoFormData[]>([]);
//   const handleUploadSuccess = (response: any) => {
//     // setIsUploading(false);
//     setUploadProgress(0);

//     // Add the new video to the list of uploaded videos
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

//   //   setUploadedVideos([...uploadedVideos, newVideo]);

//   {
//     uploadedVideos.length > 0 && (
//       <div className="rounded-lg border p-4 shadow-sm">
//         <h2 className="mb-4 text-xl font-semibold">Your Videos</h2>
//         <div className="grid grid-cols-1 gap-4 divide-y md:grid-cols-2 lg:grid-cols-3">
//           {uploadedVideos.map((video, index) => (
//             <div
//               key={video.fileId || index}
//               className="overflow-hidden rounded-md border"
//             >
//               <Video
//                 urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
//                 src={video.url}
//                 width={500}
//                 height={500}
//                 controls={true}
//                 className="w-full"
//               />
//               <div className="p-2">
//                 <p className="truncate font-medium">{video.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// };

// export default ShowVideo;
