"use client";

import Header from "@/components/Header";
import VideoComponent from "../components/VideoComponent";
import { Video } from "@imagekit/next";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Header></Header>
        <VideoComponent />
        {/* Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

// return (
//   <div className="container mx-auto py-8 px-4">
//     <h1 className="text-2xl font-bold mb-6">Video Upload and Gallery</h1>

//   </div>

// );
// }

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
