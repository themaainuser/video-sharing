"use client";

import Header from "@/components/Header";
import VideoComponent from "../components/VideoComponent";
import { Video } from "@imagekit/next";
import { useSession, signIn, signOut } from "next-auth/react";


export default function Home() {
  const { data: session, status } = useSession();

    if (status === 'loading') {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
   return (
    <>
      {session ? (
        <>
          <Header />
          <VideoComponent />
        </>
      ) : (
        <div className="text-center text-red-500 text-4xl">
          <p >You are not authorised for this page</p>
          <button onClick={async () => await signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
}