import { VideoFormData } from "@/app/utils/api-client";
import { Video } from "@imagekit/next";
import { useState } from "react";

const ShowVideo = () => {
  //     const [uploadedVideos, setUploadedVideos] = useState<VideoFormData[]>([]);
  //       const handleUploadSuccess = (response: any) => {
  //   // setIsUploading(false);
  //   setUploadProgress(0);
    
  //   // Add the new video to the list of uploaded videos
  //   const newVideo: VideoData = {
  //     url: response.url,
  //     name: response.name,
  //     fileId: response.fileId
  //   };
    
  //   setUploadedVideos([...uploadedVideos, newVideo]);
  // };

  // const handleUploadProgress = (progress: number) => {
  //   setUploadProgress(progress);
  // };

  // //   setUploadedVideos([...uploadedVideos, newVideo]);

  //     {uploadedVideos.length > 0 && (
  //       <div className="p-4 border rounded-lg shadow-sm">
  //         <h2 className="text-xl font-semibold mb-4">Your Videos</h2>
  //         <div className="grid grid-cols-1 divide-y md:grid-cols-2 lg:grid-cols-3 gap-4">
  //           {uploadedVideos.map((video, index) => (
  //             <div key={video.fileId || index} className="border rounded-md overflow-hidden">
  //               <Video
  //                 urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
  //                 src={video.url}
  //                 width={500}
  //                 height={500}
  //                 controls={true}
  //                 className="w-full"
  //               />
  //               <div className="p-2">
  //                 <p className="font-medium truncate">{video.name}</p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     )}
}

export default ShowVideo;