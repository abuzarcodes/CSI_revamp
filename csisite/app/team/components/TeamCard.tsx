"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from 'motion/react';

function TeamCard({ details }: { details: any }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/team/" + details.title.replace(" ", ""));
      }}
      className="w-64 h-80 bg-blue-500/50 border border-blue-500 rounded-2xl cursor-pointer"
    >
       <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative w-full max-w-[280px] cursor-pointer"
    >
      {/* Offset glow */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-blue-500 opacity-30 blur-xl" />

      {/* Card */}
      <motion.div
        variants={{
          rest: { rotate: -1 },
          hover: { rotate: 0 },
        }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="relative z-10 bg-black border border-blue-500/40 p-3"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={details.imageUrl}
            alt={details.title}
            className="h-64 w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
          />

          {/* Role tag */}
          <div className="absolute bottom-3 left-3 bg-blue-500 text-black px-3 py-1 text-xs font-bold tracking-widest">
            {details.subtitle.toUpperCase()}
          </div>
        </div>

        {/* Text */}
        <div className="mt-4">
          <h3 className="text-white text-xl font-semibold leading-tight">
            {details.title}
          </h3>

          <a
            href={details.linkedin}
            target="_blank"
            className="mt-2 inline-block text-sm text-blue-400 underline-offset-4 hover:underline"
          >
            LinkedIn →
          </a>
        </div>
      </motion.div>

      {/* Decorative cross */}
      <span className="absolute -top-3 -right-3 text-blue-500 text-xl font-bold">
        ✕
      </span>
    </motion.div>
    </div>
  );
}

export default TeamCard;
