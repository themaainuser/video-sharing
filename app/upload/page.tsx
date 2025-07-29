import VideoComponent from "@/app/components/VideoComponent";
import { apiClient } from "../utils/api-client";

const Upload = async () => {
  const videos = await apiClient.getVideos();
  console.log(videos);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <VideoComponent style={{ aspectRatio: 9/16 }} />
    </div>
  );
};

export default Upload;
