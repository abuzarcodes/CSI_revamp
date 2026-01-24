"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <section
      className="bg-black relative w-full h-screen flex items-center justify-center overflow-hidden"
      id="about"
    >
      <motion.div
        className="bg-blue-500/5 w-full overflow-hidden mb-10 flex flex-col justify-center items-center"
        initial={{ height: "2%" }}
        whileInView={{ height: "100%" }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div
          className="absolute w-200 h-200 z-50 bg-blue-500 rounded-full opacity-10 blur-3xl bg-radial pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: "10%" }}
          // animate={{
          //   x: mousePosition.x * 0.05,
          //   y: mousePosition.y * 0.05,
          // }}
          transition={{ duration: 2, delay: 1 }}
          style={{ bottom: -200, left: -100 }}
        />
        <span className="mb-6 block text-sm tracking-[0.3em] text-blue-400">
          ABOUT CSI
        </span>

        <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
          Building thinkers,
          <br />
          not just coders.
        </h1>

        <div className="mt-6 h-[2px] w-24 bg-blue-500" />

        <p className="mt-8 text-lg leading-relaxed text-gray-400 max-w-3xl text-justify">
          The Computer Society of India (CSI), founded on March 6, 1965, stands
          as a premier organization dedicated to the advancement of computer
          engineering and technology. Our platform serves as a dynamic space for
          professionals and enthusiasts to exchange innovative ideas, fostering
          growth in Computer Engineering, Technology Systems, Science and
          Engineering, and Information Processing.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <span className="block text-blue-400 mb-2">01</span>
            Learn by building.
          </div>
          <div>
            <span className="block text-blue-400 mb-2">02</span>
            Community over competition.
          </div>
          <div>
            <span className="block text-blue-400 mb-2">03</span>
            Curiosity first. Always.
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
