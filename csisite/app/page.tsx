import Image from "next/image";
import { Hero } from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Events from "./components/Events";

export default function Home() {
  return (
    <>
    <Hero/>
    <AboutSection/>
    <Events/>
    </>
  );
}
