"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMember {
  Name: string;
  Role: string;
  LinkedIn: string;
  GitHub: string;
  Email: string;
  Image: string;
}

interface TeamData {
  WebDevTeam: {
    TeamLead: TeamMember;
    TeamMembers: TeamMember[];
    GuidedBy: TeamMember[];
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const MemberCard: React.FC<{
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
  isLead?: boolean;
  isGuide?: boolean;
}> = ({ member, onSelect, isLead, isGuide }) => {
  return (
    <motion.div
      layoutId={`member-${member.Name}`}
      onClick={() => onSelect(member)}
      className="cursor-pointer"
      variants={fadeInUp}
      whileHover={{ y: -8 }}
    >
      <Card
        className="
        overflow-hidden
        bg-[#111827]/60
        backdrop-blur-xl
        border border-blue-500/20
        rounded-2xl
        shadow-[0_0_25px_rgba(59,130,246,0.15)]
        hover:shadow-[0_0_35px_rgba(59,130,246,0.4)]
        transition-all duration-300
      "
      >
        <CardContent className="p-0">
          <div className="relative h-72 w-full">
            <Image
              src={member.Image}
              alt={member.Name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-semibold text-blue-200">
                {member.Name}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                {isLead && (
                  <span className="bg-blue-500/20 border border-blue-400 text-blue-300 text-xs px-3 py-1 rounded-full">
                    Team Lead
                  </span>
                )}

                {isGuide && (
                  <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs px-3 py-1 rounded-full">
                    Guided By
                  </span>
                )}

                {!isLead && !isGuide && (
                  <p className="text-sm text-blue-400">{member.Role}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MemberDetails: React.FC<{
  member: TeamMember;
  onClose: () => void;
}> = ({ member, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        layoutId={`member-${member.Name}`}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f172a] border border-blue-500/30 rounded-2xl max-w-3xl w-full overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.4)]"
      >
        <div className="relative h-80 w-full">
          <Image
            src={member.Image}
            alt={member.Name}
            fill
            className="object-contain"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-blue-300 mb-2">
            {member.Name}
          </h2>

          <p className="text-blue-400 mb-6">{member.Role}</p>

          <div className="flex gap-6">
            <a
              href={member.GitHub}
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition"
            >
              <Github size={20} />
              GitHub
            </a>

            <a
              href={member.LinkedIn}
              target="_blank"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>

            <a
              href={`mailto:${member.Email}`}
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition"
            >
              <Mail size={20} />
              Email
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function WebDevTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/web_dev.json");
      const data = await res.json();
      setTeamData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_center,#3b82f6_1px,transparent_1px)] bg-[size:40px_40px]" />

      <main className="relative pt-24 container mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
            Web Development Team
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Engineers powering CSI’s digital infrastructure with precision,
            performance, and innovation.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
          </div>
        ) : (
          teamData && (
            <div className="space-y-16">
              {/* Guided By */}
              {teamData.WebDevTeam.GuidedBy?.length > 0 && (
                <>
                  <h2 className="text-3xl font-semibold text-blue-300 text-center">
                    Guided By
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {teamData.WebDevTeam.GuidedBy.map((member) => (
                      <MemberCard
                        key={member.Name}
                        member={member}
                        onSelect={setSelectedMember}
                        isGuide
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Lead */}
              <div className="text-center">
                <h2 className="text-3xl font-semibold text-blue-300 mb-8">
                  Team Lead
                </h2>

                <div className="max-w-sm mx-auto">
                  <MemberCard
                    member={teamData.WebDevTeam.TeamLead}
                    onSelect={setSelectedMember}
                    isLead
                  />
                </div>
              </div>

              {/* Members */}
              <h2 className="text-3xl font-semibold text-blue-300 text-center">
                Core Team
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamData.WebDevTeam.TeamMembers.map((member) => (
                  <MemberCard
                    key={member.Name}
                    member={member}
                    onSelect={setSelectedMember}
                  />
                ))}
              </div>
            </div>
          )
        )}

        <AnimatePresence>
          {selectedMember && (
            <MemberDetails
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
