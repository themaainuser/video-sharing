"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Spotlight } from "@/components/ui/spotlight";
import {
  IconCloudUpload,
  IconVideo,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconBell,
  IconDownload,
  IconEye,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();

  const stats = [
    {
      title: "Total Videos",
      value: "24",
      icon: <IconVideo className="h-4 w-4 text-neutral-500" />,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Views",
      value: "12.4K",
      icon: <IconEye className="h-4 w-4 text-neutral-500" />,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Storage Used",
      value: "2.1 GB",
      icon: <IconCloudUpload className="h-4 w-4 text-neutral-500" />,
      change: "+15%",
      changeType: "neutral",
    },
    {
      title: "Downloads",
      value: "847",
      icon: <IconDownload className="h-4 w-4 text-neutral-500" />,
      change: "+23%",
      changeType: "positive",
    },
  ];

  const quickActions = [
    {
      title: "Upload Video",
      description: "Upload and manage your video content",
      icon: <IconCloudUpload className="h-8 w-8 text-blue-500" />,
      href: "/upload",
      className: "md:col-span-2",
    },
    {
      title: "Analytics",
      description: "View detailed analytics and insights",
      icon: <IconChartBar className="h-8 w-8 text-green-500" />,
      href: "/analytics",
    },
    {
      title: "Settings",
      description: "Manage your account settings",
      icon: <IconSettings className="h-8 w-8 text-purple-500" />,
      href: "/settings",
    },
    {
      title: "Notifications",
      description: "Check your latest notifications",
      icon: <IconBell className="h-8 w-8 text-orange-500" />,
      href: "/notifications",
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome back, {session?.user?.name || session?.user?.email || "User"}!
                </h1>
                <p className="text-slate-300 text-lg">
                  Here's what's happening with your videos today.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="avatar placeholder">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-16">
                    <span className="text-xl font-bold">
                      {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="card-body p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-400' : 
                      stat.changeType === 'negative' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-slate-400 text-sm ml-2">from last month</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <BentoGrid className="max-w-4xl mx-auto">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <BentoGridItem
                    title={action.title}
                    description={action.description}
                    header={
                      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20" />
                        <div className="absolute bottom-4 right-4">
                          {action.icon}
                        </div>
                      </div>
                    }
                    className={`${action.className} hover:scale-105 transition-transform duration-200 cursor-pointer bg-white/5 backdrop-blur-lg border-white/10`}
                  />
                </Link>
              ))}
            </BentoGrid>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-white text-xl mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: "Uploaded", item: "Summer Vacation 2024.mp4", time: "2 hours ago", type: "upload" },
                    { action: "Downloaded", item: "Product Demo.mp4", time: "5 hours ago", type: "download" },
                    { action: "Shared", item: "Team Meeting Recording.mp4", time: "1 day ago", type: "share" },
                    { action: "Deleted", item: "Old Backup.mp4", time: "2 days ago", type: "delete" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'upload' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'download' ? 'bg-blue-500/20 text-blue-400' :
                        activity.type === 'share' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {activity.type === 'upload' && <IconCloudUpload className="h-4 w-4" />}
                        {activity.type === 'download' && <IconDownload className="h-4 w-4" />}
                        {activity.type === 'share' && <IconUsers className="h-4 w-4" />}
                        {activity.type === 'delete' && <IconSettings className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {activity.action} <span className="text-slate-300">{activity.item}</span>
                        </p>
                        <p className="text-slate-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;