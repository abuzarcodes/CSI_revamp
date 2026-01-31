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
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { TimelineData } from "./TimelineData";
import Link from "next/link";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const Timeline = () => {
  const [currentYear, setCurrentYear] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userActivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wheelDeltaRef = useRef(0);

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
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
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

  // Scroll-based timeline navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling behavior
      e.preventDefault();

      // Accumulate wheel delta
      wheelDeltaRef.current += e.deltaY;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Navigate only after accumulating enough scroll delta
      const scrollThreshold = 50;

      if (wheelDeltaRef.current > scrollThreshold) {
        // Scroll down
        navigateTimeline("down");
        wheelDeltaRef.current = 0;
      } else if (wheelDeltaRef.current < -scrollThreshold) {
        // Scroll up
        navigateTimeline("up");
        wheelDeltaRef.current = 0;
      }

      // Reset delta after 200ms of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        wheelDeltaRef.current = 0;
      }, 200);
    };

    // Add listener with passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentYear]);

  // GSAP animations for content transitions
  useEffect(() => {
    const contentElement = document.querySelector(".timeline-content");
    if (contentElement) {
      gsap.fromTo(
        contentElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }

    // Animate sidebar active item into view
    const activeItem = document.querySelector(
      `[data-timeline-index="${currentYear}"]`
    );
    if (activeItem) {
      const sidebar = activeItem.closest(".overflow-y-auto");
      if (sidebar) {
        const scrollTarget =
          (activeItem as HTMLElement).offsetTop -
          sidebar.clientHeight / 2 +
          (activeItem as HTMLElement).clientHeight / 2;
        gsap.to(sidebar, {
          scrollTo: { y: scrollTarget },
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    }
  }, [currentYear]);

  return (
    <div className="inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white relative">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `
               linear-gradient(rgba(30, 58, 138, 0.2) 1px, transparent 1px),
               linear-gradient(90deg, rgba(30, 58, 138, 0.2) 1px, transparent 1px)
             `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 h-12 bg-gradient-to-r from-slate-950 to-blue-950/50 border-b border-blue-900/30 flex items-center justify-between px-4 z-50 backdrop-blur-md"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-blue-400" />
            ) : (
              <Menu className="w-5 h-5 text-blue-400" />
            )}
          </motion.button>
          <span className="text-xs font-mono tracking-wider text-gray-500 uppercase">
            Timeline Archive
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>Record</span>
            <motion.span
              key={currentYear}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-blue-400"
            >
              {String(currentYear + 1).padStart(2, "0")}
            </motion.span>
            <span>/</span>
            <span>{String(TimelineData.length).padStart(2, "0")}</span>
          </div>
          <Link href={"/"}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 hover:bg-gray-800 transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-blue-400" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="flex w-full h-[calc(100vh-3rem)]">
        {/* Left Timeline Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } fixed md:static z-40 w-72 bg-gradient-to-b from-slate-950 via-blue-950/40 to-slate-950 border-r border-blue-900/30 flex flex-col h-[calc(100vh-3rem)] transition-transform duration-200`}
        >
          {/* Header */}
          <div className="h-14 border-b border-blue-900/30 flex items-center px-6">
            <div className="flex items-center gap-2">
              <Square className="w-3 h-3 text-blue-500" />
              <span className="text-sm font-mono tracking-wide text-blue-300/60 uppercase">
                Index
              </span>
            </div>
          </div>

          {/* Timeline List */}
          <div className="flex-1 overflow-y-auto relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-900/20"></div>

            {TimelineData.map((item, index) => (
              <motion.button
                key={index}
                data-timeline-index={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                onClick={() => handleYearClick(index)}
                className={`w-full text-left relative py-5 px-6 transition-all duration-150 border-l-2 ${
                  currentYear === index
                    ? "bg-blue-900/20 border-l-blue-500"
                    : "border-l-transparent hover:bg-blue-950/30 hover:border-l-blue-900/50"
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`absolute left-[1.375rem] w-2 h-2 transition-all ${
                    currentYear === index
                      ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                      : "bg-gray-700 border border-gray-600"
                  }`}
                >
                  {currentYear === index && (
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 8px rgba(59,130,246,0.6)",
                          "0 0 12px rgba(59,130,246,0.8)",
                          "0 0 8px rgba(59,130,246,0.6)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </motion.div>

                <div className="ml-6">
                  <div
                    className={`text-xs font-mono tracking-wider mb-1 transition-colors ${
                      currentYear === index ? "text-blue-400" : "text-blue-300/40"
                    }`}
                  >
                    {item.date}
                  </div>
                  <div
                    className={`text-sm font-medium transition-colors ${
                      currentYear === index ? "text-white" : "text-blue-200/60"
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="h-16 border-t border-blue-900/30 flex items-center justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTimeline("up")}
              disabled={currentYear === 0}
              className="p-2 hover:bg-blue-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-blue-300/60" />
            </motion.button>
            <div className="w-px h-6 bg-blue-900/30"></div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTimeline("down")}
              disabled={currentYear === TimelineData.length - 1}
              className="p-2 hover:bg-blue-900/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-blue-300/60" />
            </motion.button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-gradient-to-b from-slate-950/50 via-blue-950/20 to-slate-950">
          {/* Background animation effect */}
          <motion.div
            key={currentYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none"
          />

          <motion.div
            key={currentYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="timeline-content relative z-10 max-w-5xl mx-auto p-6 md:p-12 lg:p-16"
          >
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-12 border-b border-blue-900/30 pb-8"
            >
              <div className="flex items-baseline justify-between mb-4 flex-col md:flex-row gap-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  {currentData.title}
                </h1>
                <div className="text-sm font-mono text-blue-400 tracking-wider">
                  {currentData.date}
                </div>
              </div>
              <p className="text-blue-200/60 text-lg">{currentData.description}</p>
            </motion.div>

            {/* Content Module */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8"
            >
              <div className="border border-blue-900/30 bg-blue-950/20">
                <div className="border-b border-blue-900/30 px-4 py-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500"></div>
                  <span className="text-xs font-mono tracking-wider text-blue-300/60 uppercase">
                    Record Data
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-blue-100/70 leading-relaxed">
                    {currentData.content}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Video Module */}
            {currentData.video && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-8"
              >
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
                  <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between flex-col sm:flex-row gap-3">
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
              </motion.div>
            )}

            {/* Image Gallery Module */}
            {currentData.images && currentData.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-8"
              >
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
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                          whileHover={{ scale: 1.02, y: -2 }}
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
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-800"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-6">
                <motion.div
                  animate={{
                    boxShadow: userActive
                      ? [
                          "0 0 0 0 rgba(34, 197, 94, 0.7)",
                          "0 0 0 6px rgba(34, 197, 94, 0)",
                        ]
                      : "none",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: userActive ? Infinity : 0,
                  }}
                  className={`w-1.5 h-1.5 rounded-full ${userActive ? "bg-green-500" : "bg-gray-600"}`}
                ></motion.div>
                <span>SYSTEM: {userActive ? "ACTIVE" : "STANDBY"}</span>
              </div>

              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-3 mt-8">
                <div className="text-xs font-mono text-gray-600">
                  {currentYear === TimelineData.length - 1
                    ? "LAST RECORD"
                    : currentYear === 0
                      ? "FIRST RECORD"
                      : `RECORD ${currentYear + 1} OF ${TimelineData.length}`}
                </div>
                {currentYear < TimelineData.length - 1 && (
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-gray-600"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
