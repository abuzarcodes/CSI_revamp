"use client";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Globe, Users } from "lucide-react";
// import { FaUsers, FaCalendarAlt, FaProjectDiagram, FaAward } from "react-icons/fa";

const stats = [
  {
    icon: Users,
    label: "Members",
    value: "200+",
    description: "A thriving community of tech enthusiasts",
  },
  {
    icon: Calendar,
    label: "Events/Year",
    value: "54+",
    description: "Regular workshops, seminars, and competitions",
  },
  {
    icon: Globe,
    label: "Network",
    value: "National",
    description: "Connected to CSI chapters worldwide",
  },
  {
    icon: BookOpen,
    label: "Resources",
    value: "100+",
    description: "Access to exclusive tech content and tutorials",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};



export default function ClubInfoSection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blue ambient glows */}
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px]" />

      <motion.div
        className="relative max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.div
          className="text-center mb-24"
          variants={itemVariants}
        >
          <span className="text-sm tracking-[0.3em] text-blue-400 uppercase">
            Computer Society of India
          </span>

          <h2 className="mt-6 text-5xl md:text-6xl font-semibold text-white">
            Club Overview
          </h2>

          <div className="mt-6 h-[2px] w-24 mx-auto bg-blue-500" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative border border-blue-500/20 bg-[#050B17] p-8 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <stat.icon className="w-10 h-10 text-blue-500" />
                  <span className="text-xs text-blue-400 tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>

                <div className="text-blue-300 font-medium mb-3">
                  {stat.label}
                </div>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
