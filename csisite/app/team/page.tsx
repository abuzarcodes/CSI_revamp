import React from "react";
import TeamCard from "./components/TeamCard";
import {CurrentLeads} from "./TeamData";

function page() {
  return (
    <div className="relative w-full bg-black py-20">
  <div className="mx-auto max-w-6xl px-6">
    <h1 className="text-blue-500 text-6xl text-center mb-10">TEAM MEMBERS</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-x-10 gap-y-16">
      {CurrentLeads.map((details, index) => (
        <TeamCard key={details.id ?? index} details={details} />
      ))}
    </div>
  </div>
</div>

  );
}

export default page;
