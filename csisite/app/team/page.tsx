"use client";
import React, { useEffect, useState } from "react";
import TeamCard from "./components/TeamCard";
import { CurrentLeads } from "./TeamData";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TeamMember {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  linkedin?: string;
  github?: string;
}

function page() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [teamData, setTeamData] = useState<{
    currentLeads: TeamMember[];
    "2024-2025Leads": TeamMember[];
    "2023Leads": TeamMember[];
    "2022Leads": TeamMember[];
  }>({
    currentLeads: [],
    "2024-2025Leads": [],
    "2023Leads": [],
    "2022Leads": [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const years = [2026, 2025, 2023, 2022];

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const displayedTeam =
    selectedYear === 2026
      ? teamData.currentLeads
      : selectedYear === 2025
        ? teamData["2024-2025Leads"]
        : selectedYear === 2023
          ? teamData["2023Leads"]
          : teamData["2022Leads"];

  const leadershipRoles = [
    "President",
    "Vice President",
    "Executive",
    "Co-Executive",
    "Former President",
    "Former Vice President",
    "Former Executive",
    "Former Co-Executive",
  ];

  const leadershipTeam = displayedTeam.filter((member) =>
    leadershipRoles.includes(member.subtitle.trim()),
  );

  const otherTeamMembers = displayedTeam.filter(
    (member) => !leadershipRoles.includes(member.subtitle.trim()),
  );

  return (
    <div className="relative w-full bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-blue-500 text-6xl text-center mb-10">
          TEAM MEMBERS
        </h1>
        <div className="flex justify-center gap-16 sm:gap-32 items-center relative mb-16">
          {years.map((year, index) => (
            <TimelineDot
              key={year}
              year={year}
              isActive={selectedYear === year}
              onClick={() => setSelectedYear(year)}
              delay={index * 0.2}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-x-10 gap-y-16">
          {leadershipTeam.map((details, index) => (
            <TeamCard key={details.id ?? index} details={details} />
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-x-10 gap-y-16">
          {otherTeamMembers.map((details, index) => (
            <TeamCard key={details.id ?? index} details={details} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;

const TimelineDot = ({
  year,
  isActive,
  onClick,
  delay,
}: {
  year: number;
  isActive: boolean;
  onClick: () => void;
  delay: number;
}) => (
  <motion.div
    className="relative flex flex-col items-center "
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    {/* Dot */}
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      className="relative mb-6 focus:outline-none cursor-pointer"
    >
      {/* Outer pulse (active only) */}
      {isActive && (
        <motion.span
          className="absolute inset-0 rounded-full border border-cyan-400/40"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Core node */}
      <div
        className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all
          ${
            isActive
              ? "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)]"
              : "bg-blue-600/70"
          }
        `}
      />

      {/* Inner core */}
      <div
        className={`absolute inset-[3px] rounded-full
          ${isActive ? "bg-black" : "bg-blue-900"}
        `}
      />
    </motion.button>

    {/* Label */}
    <motion.div
      className="mt-1 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.15 }}
    >
      <span
        className={`text-xs sm:text-sm tracking-wide font-semibold
          ${isActive ? "text-cyan-300" : "text-blue-400"}
        `}
      >
        {year === 2026 ? "CURRENT" : year === 2025 ? "2024–2025" : year}
      </span>
    </motion.div>
  </motion.div>
);
