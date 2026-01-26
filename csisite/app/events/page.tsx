"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  MoreHorizontal,
  Menu,
  X,
  ChevronLeft,
  Square,
} from "lucide-react";
import { TimelineData } from "./TimelineData";
import Link from "next/link";

const Timeline = () => {
  const [currentYear, setCurrentYear] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userActivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentData = TimelineData[currentYear];

  const hideFooter = () => {
    document.querySelector("footer")?.classList.add("hidden");
  };

  const handleYearClick = (index: number) => {
    setCurrentYear(index);
    resetAutoScrollTimer();
    registerUserActivity();
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const navigateTimeline = (direction: "up" | "down") => {
    if (direction === "up" && currentYear > 0) {
      setCurrentYear(currentYear - 1);
    } else if (direction === "down" && currentYear < TimelineData.length - 1) {
      setCurrentYear(currentYear + 1);
    }
    resetAutoScrollTimer();
    registerUserActivity();
  };

  const registerUserActivity = () => {
    setUserActive(true);
    setAutoScrollPaused(true);

    if (userActivityTimerRef.current) {
      clearTimeout(userActivityTimerRef.current);
    }

    userActivityTimerRef.current = setTimeout(() => {
      setUserActive(false);
      setAutoScrollPaused(false);
    }, 5000);
  };

  const resetAutoScrollTimer = () => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }

    if (!autoScrollPaused) {
      autoScrollTimerRef.current = setTimeout(() => {
        if (currentYear < TimelineData.length - 1) {
          setCurrentYear((prev) => prev + 1);
        } else {
          setCurrentYear(0);
        }
      }, 10000);
    }
  };

  useEffect(() => {
    hideFooter();
    resetAutoScrollTimer();

    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
      if (userActivityTimerRef.current) {
        clearTimeout(userActivityTimerRef.current);
      }
    };
  }, [currentYear, autoScrollPaused]);

  useEffect(() => {
    const handleActivity = () => {
      registerUserActivity();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("scroll", handleActivity);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    registerUserActivity();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateTimeline("up");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateTimeline("down");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentYear]);

  return (
    <div className="inset-0 w-screen h-screen overflow-hidden bg-black text-white relative">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
               linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
             `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-black/90 border-b border-gray-800 flex items-center justify-between px-4 z-50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-blue-400" />
            ) : (
              <Menu className="w-5 h-5 text-blue-400" />
            )}
          </button>
          <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
            Timeline Archive
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>Record</span>
            <span className="text-blue-400">
              {String(currentYear + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(TimelineData.length).padStart(2, "0")}</span>
          </div>
          <Link href={"/"}>
            <button className="p-1.5 hover:bg-gray-800 transition-colors group">
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-400" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex w-full h-[calc(100vh-3rem)]">
        {/* Left Timeline Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } fixed md:static z-40 w-72 bg-black border-r border-gray-800 flex flex-col h-[calc(100vh-3rem)] transition-transform duration-200`}
        >
          {/* Header */}
          <div className="h-14 border-b border-gray-800 flex items-center px-6">
            <div className="flex items-center gap-2">
              <Square className="w-3 h-3 text-blue-500" />
              <span className="text-sm font-mono tracking-wide text-gray-400 uppercase">
                Index
              </span>
            </div>
          </div>

          {/* Timeline List */}
          <div className="flex-1 overflow-y-auto relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-800"></div>

            {TimelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => handleYearClick(index)}
                className={`w-full text-left relative py-5 px-6 transition-all duration-150 border-l-2 ${
                  currentYear === index
                    ? "bg-gray-900/50 border-l-blue-500"
                    : "border-l-transparent hover:bg-gray-900/30 hover:border-l-gray-700"
                }`}
              >
                <div
                  className={`absolute left-[1.375rem] w-2 h-2 transition-all ${
                    currentYear === index
                      ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                      : "bg-gray-700 border border-gray-600"
                  }`}
                ></div>

                <div className="ml-6">
                  <div
                    className={`text-xs font-mono tracking-wider mb-1 transition-colors ${
                      currentYear === index ? "text-blue-400" : "text-gray-600"
                    }`}
                  >
                    {item.date}
                  </div>
                  <div
                    className={`text-sm font-medium transition-colors ${
                      currentYear === index ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="h-16 border-t border-gray-800 flex items-center justify-center gap-2">
            <button
              onClick={() => navigateTimeline("up")}
              disabled={currentYear === 0}
              className="p-2 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-400" />
            </button>
            <div className="w-px h-6 bg-gray-800"></div>
            <button
              onClick={() => navigateTimeline("down")}
              disabled={currentYear === TimelineData.length - 1}
              className="p-2 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 md:p-12 lg:p-16">
            {/* Header Section */}
            <div className="mb-12 border-b border-gray-800 pb-8">
              <div className="flex items-baseline justify-between mb-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {currentData.title}
                </h1>
                <div className="text-sm font-mono text-blue-400 tracking-wider">
                  {currentData.date}
                </div>
              </div>
              <p className="text-gray-400 text-lg">{currentData.description}</p>
            </div>

            {/* Content Module */}
            <div className="mb-8">
              <div className="border border-gray-800 bg-gray-900/20">
                <div className="border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500"></div>
                  <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
                    Record Data
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed">
                    {currentData.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Video Module */}
            {currentData.video && (
              <div className="mb-8">
                <div className="border border-gray-800 bg-black overflow-hidden">
                  <div className="border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500"></div>
                    <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
                      Video Archive
                    </span>
                  </div>
                  <div className="aspect-video relative bg-black">
                    <iframe
                      src={currentData.video.url}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-mono">
                      {currentData.video.title}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        className="p-1.5 hover:bg-gray-800 transition-colors"
                      >
                        {isVideoPlaying ? (
                          <Pause className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Play className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className="p-1.5 hover:bg-gray-800 transition-colors"
                      >
                        {isVideoMuted ? (
                          <VolumeX className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      <button className="p-1.5 hover:bg-gray-800 transition-colors">
                        <Maximize className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-800 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Image Gallery Module */}
            {currentData.images && currentData.images.length > 0 && (
              <div className="mb-8">
                <div className="border border-gray-800 bg-gray-900/20">
                  <div className="border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500"></div>
                    <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
                      Image Records
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentData.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-gray-900 border border-gray-800 overflow-hidden group cursor-pointer relative"
                        >
                          <img
                            src={image}
                            alt={`${currentData.title} - ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-2 left-2 text-xs font-mono text-gray-400">
                              IMG_{String(index + 1).padStart(3, "0")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status indicator */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${userActive ? "bg-green-500" : "bg-gray-600"}`}
                ></div>
                <span>SYSTEM: {userActive ? "ACTIVE" : "STANDBY"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
