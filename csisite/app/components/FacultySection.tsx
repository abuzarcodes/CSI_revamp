"use client";
import { motion } from "motion/react";
import React from "react";

function FacultySection() {
  return (
    <div className="bg-black w-full h-screen flex flex-col gap-y-10 justify-center items-center">
        <h1 className=" uppercase tracking-[20px] text-blue-500 text-4xl font-extralight">
          Faculty Advisor
        </h1>
      <FacultyCard
        name="Dr.Jitender Singh"
        position="Associate Professor"
        image="/jitendersir.png"
        description="Jitender Singh is an Associate Professor at the Department of Computer Science and Engineering, SRM Institute of Science and Technology, Delhi-NCR Campus. He has a Master's degree in Computer Science and Engineering and has been teaching for over 10 years. He is passionate about teaching and research in the field of Computer Science."
      />
    </div>
  );
}

export default FacultySection;

type FacultyCardProps = {
  name: string;
  position: string;
  image: string;
  description: string;
};

function FacultyCard({ name, position, image, description }: FacultyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5,delay:0.5, ease: "easeOut" }}
      className="relative max-w-5xl mx-auto bg-[#0a0a0a] border border-blue-500/25 px-8 py-10 shadow-2xl shadow-blue-500/15 "
    >
      {/* Top academic stripe */}
      <div className="absolute left-0 top-0 h-[3px] w-full bg-blue-500" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
        {/* Image */}
        <div className="md:col-span-2">
          <div className="relative">
            <img
              src={image}
              alt={name}
              className="w-full object-cover border border-blue-500/30 rounded-s"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <span className="text-xs tracking-widest text-blue-400 uppercase">
            Faculty Advisor
          </span>

          <h3 className="mt-3 text-3xl font-semibold text-white">{name}</h3>

          <p className="mt-1 text-blue-300">{position}</p>

          {/* Divider */}
          <div className="mt-4 h-[1px] w-20 bg-blue-500" />

          <p className="mt-6 text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
