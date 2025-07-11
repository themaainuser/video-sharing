"use client";

import Header from "@/components/Header";
import VideoComponent from "../components/videoComponent";
import { Video } from "@imagekit/next";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Video Upload and Gallery</h1>
    <Header>
    </Header>
       <VideoComponent />
    </div>

  );
}


// export default function Home() {
//   return (
//     <div>
//       <form>
//         <input type="file" />
//       </form>
//       {/* <Video
//         className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
//         urlEndpoint="https://ik.imagekit.io/fnwhfnpzm"
//         src="/sample-video.mp4"
//         width={500}
//         height={500}
//         autoPlay = {false}
//         loop
//         muted
//       /> */}
//     </div>
//   );
// }
