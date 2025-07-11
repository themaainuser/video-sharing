"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconCloudUpload,
  IconVideo,
  IconUsers,
  IconChartBar,
  IconPlay,
  IconDownload,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Header from "@/components/Header";
import VideoComponent from "../components/videoComponent";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      title: "Upload & Manage",
      description: "Upload videos with ease and manage your content library",
      icon: <IconCloudUpload className="h-8 w-8 text-blue-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Video Analytics",
      description: "Track views, engagement, and performance metrics",
      icon: <IconChartBar className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Share & Collaborate",
      description: "Share videos with team members and collaborate",
      icon: <IconUsers className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "High-Quality Streaming",
      description: "Stream videos in HD with adaptive quality",
      icon: <IconPlay className="h-8 w-8 text-red-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="relative z-10">
        <Header />
        
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Videos,
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}Reimagined
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload, manage, and share your videos with our powerful platform. 
              Experience seamless video hosting with advanced analytics and collaboration tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {session ? (
                <Link href="/dashboard" className="btn btn-primary btn-lg px-8 py-4 text-lg">
                  <IconVideo className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/login" className="btn btn-primary btn-lg px-8 py-4 text-lg">
                  Get Started Free
                </Link>
              )}
              <Link href="#features" className="btn btn-outline btn-lg px-8 py-4 text-lg text-white border-white hover:bg-white hover:text-slate-900">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {[
              { number: "10K+", label: "Videos Uploaded", icon: <IconVideo className="h-8 w-8" /> },
              { number: "50M+", label: "Total Views", icon: <IconPlay className="h-8 w-8" /> },
              { number: "1M+", label: "Downloads", icon: <IconDownload className="h-8 w-8" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="card-body items-center text-center p-8">
                    <div className="text-blue-400 mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-slate-300 text-lg">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
  );
}

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="features"
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Powerful Features for
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}Modern Creators
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Everything you need to manage, share, and analyze your video content in one place.
              </p>
            </div>
            
            <BentoGrid className="max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <BentoGridItem
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  header={
                    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20" />
                      <div className="absolute bottom-4 right-4">
                        {feature.icon}
                      </div>
                    </div>
                  }
                  className={`${feature.className} hover:scale-105 transition-transform duration-200 bg-white/5 backdrop-blur-lg border-white/10`}
                />
              ))}
            </BentoGrid>
          </motion.div>

          {/* Video Upload Section */}
          {session && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-20"
            >
              <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="card-body p-8">
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Upload Your Videos
                  </h2>
                  <VideoComponent />
                </div>
              </div>
            </motion.div>
          )}
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

          {/* CTA Section */}
          {!session && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center"
            >
              <div className="card bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="card-body p-12">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Ready to Get Started?
                  </h2>
                  <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of creators who trust our platform for their video hosting needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/register" className="btn btn-primary btn-lg px-8 py-4 text-lg">
                      Create Free Account
                    </Link>
                    <Link href="/login" className="btn btn-outline btn-lg px-8 py-4 text-lg text-white border-white hover:bg-white hover:text-slate-900">
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>