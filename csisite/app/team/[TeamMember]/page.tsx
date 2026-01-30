"use client";

import React, { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  linkedin?: string;
  github?: string;
  bio?: string;
  skills?: string[];
}

export default function Page({
  params,
}: {
  params: Promise<{ TeamMember: string }>;
}) {
  const { TeamMember } = React.use(params);

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setTeamData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load team data:", err);
        setLoading(false);
      });
  }, []);

  const allMembers: TeamMember[] = [
    ...teamData.currentLeads,
    ...teamData["2024-2025Leads"],
    ...teamData["2023Leads"],
    ...teamData["2022Leads"],
  ];

  const normalizedSlug = TeamMember.toLowerCase();

  const theMember = allMembers.find(
    (member) =>
      member.title.replace(/\s+/g, "").toLowerCase() === normalizedSlug,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <span className="text-blue-500 text-sm tracking-widest animate-pulse">
          LOADING PROFILE
        </span>
      </div>
    );
  }

  if (!theMember) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-gray-500 text-xl">Team Member Not Found</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-1">
          <img
            src={theMember.imageUrl}
            alt={theMember.title}
            className="w-full rounded-bl-3xl rounded-tr-3xl border border-blue-500/30 hover:rounded-none transition-all duration-500"
          />

          <h2 className="mt-6 text-2xl font-semibold">{theMember.title}</h2>
          <p className="text-blue-400 mt-1">{theMember.subtitle}</p>

          {theMember.linkedin && (
            <a
              href={theMember.linkedin}
              target="_blank"
              className="mt-6 inline-flex justify-center w-full border border-blue-500/40 py-2 text-sm hover:bg-blue-500 hover:text-black transition"
            >
              View LinkedIn
            </a>
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="lg:col-span-3 space-y-12">
          {/* ABOUT */}
          <section>
            <h3 className="text-xs tracking-widest text-gray-400 uppercase mb-3">
              About
            </h3>
            <p className="text-gray-300 max-w-3xl leading-relaxed">
              {theMember.bio ?? "No biography available for this team member."}
            </p>
          </section>

          {/* SKILLS */}
          <section>
            <h3 className="text-xs tracking-widest text-gray-400 uppercase mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {(theMember.skills ?? ["Not Specified"]).map((skill) => (
                <span
                  key={skill}
                  className="border border-blue-500/40 px-4 py-1 text-sm text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* SOCIAL */}
          <section>
            <h3 className="text-xs tracking-widest text-gray-400 uppercase mb-4">
              Social
            </h3>
            <div className="flex gap-6 text-sm">
              {theMember.linkedin && (
                <a
                  href={theMember.linkedin}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                >
                  LinkedIn
                </a>
              )}
              {theMember.github && (
                <a
                  href={theMember.github}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                >
                  GitHub
                </a>
              )}
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}
