import Image from "next/image";
import { Hero } from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Events from "./components/Events";
import FacultySection from "./components/FacultySection";
import { Club } from "lucide-react";
import ClubInfoSection from "./components/ClubInfoSection";

export default function Home() {
  return (
    <>
    <Hero/>
    <AboutSection/>
    <FacultySection/>
    {/* <Events/> */}
    <ClubInfoSection/>
    </>
  );
}
