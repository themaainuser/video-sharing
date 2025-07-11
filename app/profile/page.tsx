"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import {
  IconUser,
  IconMail,
  IconCalendar,
  IconSettings,
  IconCamera,
  IconEdit,
  // IconSave,
  IconX,
  IconShield,
  IconBell,
  IconPalette,
  IconKey,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    bio: "Video content creator and digital storyteller. Passionate about creating engaging visual experiences.",
    location: "San Francisco, CA",
    website: "https://example.com",
    joinDate: "January 2024",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <IconUser className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <IconShield className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <IconBell className="h-4 w-4" /> },
    { id: "preferences", label: "Preferences", icon: <IconPalette className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0" />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-slate-300 text-lg">Manage your account settings and preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="card-body p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <div className="avatar placeholder">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-24">
                          <span className="text-2xl font-bold">
                            {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                          </span>
                        </div>
                      </div>
                      <button className="absolute -bottom-2 -right-2 btn btn-circle btn-sm bg-blue-500 hover:bg-blue-600 border-none">
                        <IconCamera className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <h3 className="text-white font-bold text-lg mt-4">
                      {session?.user?.name || "User"}
                    </h3>
                    <p className="text-slate-300 text-sm">{session?.user?.email}</p>
                  </div>

                  <div className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
                <div className="card-body p-6">
                  {activeTab === "profile" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                        {!isEditing ? (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-primary btn-sm"
                          >
                            <IconEdit className="h-4 w-4 mr-2" />
                            Edit
                          </button>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSave}
                              className="btn btn-success btn-sm"
                            >
                              {/* <IconSave className="h-4 w-4 mr-2" /> */}
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(false)}
                              className="btn btn-ghost btn-sm"
                            >
                              <IconX className="h-4 w-4 mr-2" />
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Full Name</span>
                          </label>
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            disabled={!isEditing}
                            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Email</span>
                          </label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            disabled={!isEditing}
                            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Location</span>
                          </label>
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            disabled={!isEditing}
                            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Website</span>
                          </label>
                          <input
                            type="url"
                            value={profileData.website}
                            onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                            disabled={!isEditing}
                            className="input input-bordered bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                        </div>

                        <div className="form-control md:col-span-2">
                          <label className="label">
                            <span className="label-text text-slate-300">Bio</span>
                          </label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            disabled={!isEditing}
                            rows={4}
                            className="textarea textarea-bordered bg-white/10 border-white/20 text-white placeholder-slate-400"
                          />
                        </div>
                      </div>

                      <div className="divider divider-neutral mt-8"></div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="stat bg-white/5 rounded-lg">
                          <div className="stat-figure text-blue-400">
                            <IconUser className="h-8 w-8" />
                          </div>
                          <div className="stat-title text-slate-300">Member Since</div>
                          <div className="stat-value text-white text-lg">{profileData.joinDate}</div>
                        </div>

                        <div className="stat bg-white/5 rounded-lg">
                          <div className="stat-figure text-green-400">
                            <IconCalendar className="h-8 w-8" />
                          </div>
                          <div className="stat-title text-slate-300">Videos Uploaded</div>
                          <div className="stat-value text-white text-lg">24</div>
                        </div>

                        <div className="stat bg-white/5 rounded-lg">
                          <div className="stat-figure text-purple-400">
                            <IconSettings className="h-8 w-8" />
                          </div>
                          <div className="stat-title text-slate-300">Storage Used</div>
                          <div className="stat-value text-white text-lg">2.1 GB</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                      <div className="space-y-6">
                        <div className="card bg-white/5 border border-white/10">
                          <div className="card-body">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">Change Password</h3>
                                <p className="text-slate-400 text-sm">Update your password regularly for better security</p>
                              </div>
                              <button className="btn btn-outline btn-primary">
                                <IconKey className="h-4 w-4 mr-2" />
                                Change
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="card bg-white/5 border border-white/10">
                          <div className="card-body">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                                <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
                              </div>
                              <input type="checkbox" className="toggle toggle-primary" />
                            </div>
                          </div>
                        </div>

                        <div className="card bg-white/5 border border-white/10">
                          <div className="card-body">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">Login Notifications</h3>
                                <p className="text-slate-400 text-sm">Get notified when someone logs into your account</p>
                              </div>
                              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                      <div className="space-y-4">
                        {[
                          { title: "Email Notifications", description: "Receive email updates about your account" },
                          { title: "Push Notifications", description: "Get push notifications on your devices" },
                          { title: "Upload Notifications", description: "Notify when video uploads are complete" },
                          { title: "Security Alerts", description: "Important security-related notifications" },
                          { title: "Marketing Updates", description: "Receive updates about new features and offers" },
                        ].map((item, index) => (
                          <div key={index} className="card bg-white/5 border border-white/10">
                            <div className="card-body py-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-white font-semibold">{item.title}</h3>
                                  <p className="text-slate-400 text-sm">{item.description}</p>
                                </div>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked={index < 3} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Preferences</h2>
                      <div className="space-y-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Theme</span>
                          </label>
                          <select className="select select-bordered bg-white/10 border-white/20 text-white">
                            <option>Dark</option>
                            <option>Light</option>
                            <option>Auto</option>
                          </select>
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Language</span>
                          </label>
                          <select className="select select-bordered bg-white/10 border-white/20 text-white">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>

                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-slate-300">Timezone</span>
                          </label>
                          <select className="select select-bordered bg-white/10 border-white/20 text-white">
                            <option>UTC-8 (Pacific Time)</option>
                            <option>UTC-5 (Eastern Time)</option>
                            <option>UTC+0 (GMT)</option>
                            <option>UTC+1 (Central European Time)</option>
                          </select>
                        </div>

                        <div className="card bg-white/5 border border-white/10">
                          <div className="card-body">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">Auto-play Videos</h3>
                                <p className="text-slate-400 text-sm">Automatically play videos when browsing</p>
                              </div>
                              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <div className="card bg-white/5 border border-white/10">
                          <div className="card-body">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-semibold">High Quality Uploads</h3>
                                <p className="text-slate-400 text-sm">Upload videos in highest quality by default</p>
                              </div>
                              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;