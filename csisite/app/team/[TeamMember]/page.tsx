import React from "react";
import { CurrentLeads } from "../TeamData";

async function page({ params }: { params: Promise<{ TeamMember: string }> }) {
  const { TeamMember } = await params;

  const theMember = CurrentLeads.find(
    (member) =>
      member.title.replace(" ", "").toLowerCase() === TeamMember.toLowerCase(),
  );

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
        {/* LEFT – PROFILE SIDEBAR */}
        <aside className="lg:col-span-1">
          <img
            src={theMember.imageUrl}
            alt={theMember.title}
            className="w-full rounded-bl-3xl rounded-tr-3xl hover:rounded-br-3xl hover:rounded-tl-3xl hover:rounded-tr-none hover:rounded-bl-none transition-all duration-500 ease-in-out border border-blue-500/30"
          />

          <h2 className="mt-6 text-2xl font-semibold">{theMember.title}</h2>

          <p className="text-blue-400 mt-1">{theMember.subtitle}</p>

          {/* Action */}
          <a
            href={theMember.linkedin}
            target="_blank"
            className="mt-6 inline-flex items-center justify-center w-full border border-blue-500/40 py-2 text-sm hover:bg-blue-500 hover:text-black transition"
          >
            View LinkedIn
          </a>
        </aside>

        {/* RIGHT – CONTENT */}
        <main className="lg:col-span-3 space-y-12">
          {/* Bio */}
          <section>
            <h3 className="mb-3 text-sm tracking-widest text-gray-400 uppercase">
              About
            </h3>
            <p className="leading-relaxed text-gray-300 max-w-3xl">
              {theMember.bio ??
                "Passionate about technology, creativity, and building meaningful digital experiences. Actively contributing to the CSI community through events, media, and collaborative projects."}
            </p>
          </section>

          {/* Skills */}
          <section>
            <h3 className="mb-4 text-sm tracking-widest text-gray-400 uppercase">
              Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {(
                theMember.skills ?? [
                  "Design",
                  "Content",
                  "Editing",
                  "Social Media",
                  "Branding",
                ]
              ).map((skill: string) => (
                <span
                  key={skill}
                  className="border border-blue-500/40 px-4 py-1 text-sm text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Activity Section (GitHub-like)
          <section>
            <h3 className="mb-4 text-sm tracking-widest text-gray-400 uppercase">
              CSI Activity
            </h3>

            <div className="space-y-4">
              <div className="border border-blue-500/20 p-4">
                <p className="text-gray-300">
                  Contributed to media coverage for CSI events and workshops.
                </p>
                <span className="text-xs text-gray-500">
                  Jan 2026
                </span>
              </div>

              <div className="border border-blue-500/20 p-4">
                <p className="text-gray-300">
                  Led content strategy for hackathon promotions.
                </p>
                <span className="text-xs text-gray-500">
                  Dec 2025
                </span>
              </div>
            </div>
          </section> */}

          {/* Social Links */}
          <section>
            <h3 className="mb-4 text-sm tracking-widest text-gray-400 uppercase">
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
              {/* {theMember.github && (
                <a
                  href={theMember.github}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                >
                  GitHub
                </a>
              )} */}
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}

export default page;

//  {
//             "id": "2026_1",
//             "title": "Parth Mongia",
//             "subtitle": "President",
//             "imageUrl": "https://res.cloudinary.com/dzturswbu/image/upload/v1768964369/d52d4b3d-b413-498d-b57f-b64fa8287a16_e0mmxv.jpg",
//             "linkedin": "https://www.linkedin.com/in/parth308/"
//         }
