'use client';
import { motion } from "motion/react";
import React from "react";

function Navbar() {
  return (
    <motion.div className="w-full py-4 px-8 bg-black/40 overflow-hidden  border border-blue-400/40 shadow-md max-w-[80%] fixed bottom-0 z-50 rounded-2xl mx-auto left-0 right-0 mb-4 " 
      initial={{ width: "0%", opacity: 0 }}
      animate={{ width: "80%", opacity: 1 }}
      transition={{duration:1, ease: "easeInOut"}}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-500">CSI Chapter</a>
        <div>
          <a href="/" className="mx-4 text-white hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="mx-4 text-white hover:text-blue-600">
            About
          </a>
          <a href="#events" className="mx-4 text-white hover:text-blue-600">
            Events
          </a>
          <a href="/team" className="mx-4 text-white hover:text-blue-600">
            Team
          </a>
          <a href="#contact" className="mx-4 text-white hover:text-blue-600">
            Contact
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
