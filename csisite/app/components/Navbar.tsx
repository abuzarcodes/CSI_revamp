"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isTeamPage = pathname === "/team";
  const isRegistrationPage = pathname === "/join-us";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isTeamPage) {
        // On team page: navbar moves from bottom to top on scroll
        setShowNavbar(currentScrollY > lastScrollY ? false : true);
        setScrolled(currentScrollY > 50);
      } else if (isRegistrationPage) {
        // On registration page: navbar stays at top
        setScrolled(currentScrollY > 50);
        setShowNavbar(true);
      } else {
        // Default behavior for other pages
        setScrolled(currentScrollY > 50);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTeamPage, isRegistrationPage]);

  // Navbar position classes based on page
  const getPositionClasses = () => {
    if (isRegistrationPage) {
      return "top-0 bottom-auto mb-4 mt-0";
    }
    if (isTeamPage) {
      return showNavbar ? "bottom-0 top-auto mb-4" : "top-0 bottom-auto mt-4";
    }
    return "bottom-0 top-auto mb-4";
  };

  return (
    <motion.div
      className={`hidden md:block w-full py-4 px-8 bg-black/40 overflow-hidden border border-blue-400/40 shadow-md max-w-[80%] fixed z-100 rounded-2xl mx-auto left-0 right-0 transition-all duration-300 ${getPositionClasses()}`}
      initial={{ width: "0%", opacity: 0 }}
      animate={{ width: "80%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-500">
          CSI Chapter
        </a>
        <div>
          <Link href="/" className="mx-4 text-white hover:text-blue-600">
            Home
          </Link>
          <Link href="/#about" className="mx-4 text-white hover:text-blue-600">
            About
          </Link>
          <Link href="/events" className="mx-4 text-white hover:text-blue-600">
            Events
          </Link>
          <Link href="/team" className="mx-4 text-white hover:text-blue-600">
            Team
          </Link>
          <Link
            href={"/join-us"}
            className="py-2 px-4 rounded-2xl border text-white border-blue-500 bg-blue-500/10 backdrop-blur-2xl hover:bg-blue-500/30"
          >
            Register
          </Link>
          {/* <a href="#contact" className="mx-4 text-white hover:text-blue-600">
            Contact
          </a> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
