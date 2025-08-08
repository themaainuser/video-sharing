import VideoComponent from "@/app/components/VideoComponent";
import { apiClient } from "../utils/api-client";
import { Uploader } from "../components/Uploader";

const Upload = async () => {
  const videos = await apiClient.getVideos();
  console.log(videos);
  return (
    // <>
    //   <Uploader />
    // </>
    <div className="flex h-screen items-center justify-center">
      <VideoComponent />
    </div>
  );
};

export default Upload;
