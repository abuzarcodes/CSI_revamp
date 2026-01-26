import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 border border-blue-500/20 rounded-md text-blue-400 hover:text-blue-300 hover:border-blue-400 transition-all"
  >
    {icon}
  </a>
);

export default function Footer() {
  return (
    <footer className="relative bg-blue-500/6 text-gray-400 overflow-hidden">
      
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Glow */}
      <div className="absolute -top-32 left-1/3 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[160px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Logo & Identity */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/csi_logo.png"
                alt="CSI Logo"
                width={56}
                height={56}
                className="rounded-full bg-blue-500/10 border border-blue-500/30 p-2"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  CSI SRMIST
                </h3>
                <p className="text-sm text-blue-400 tracking-wide">
                  Delhi-NCR Campus
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              A technical community dedicated to advancing computer science,
              innovation, and professional excellence since 1955.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-medium mb-5 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {["Home", "About", "Faculty", "Events", "Team"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link === "Home" ? "" : "#" + link.toLowerCase()}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-5 tracking-wide">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPinIcon className="w-4 h-4 text-blue-500 mt-1" />
                <span>
                  SRMIST, Delhi-Meerut Road, Modinagar, Ghaziabad, UP 201204
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="w-4 h-4 text-blue-500" />
                <a href="tel:+911234567890" className="hover:text-blue-400">
                  +91 1234567890
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon className="w-4 h-4 text-blue-500" />
                <a
                  href="mailto:csi@srmist.edu.in"
                  className="hover:text-blue-400"
                >
                  csi@srmist.edu.in
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-5 tracking-wide">
              Stay Connected
            </h4>

            <div className="flex gap-3 mb-6">
              <SocialIcon href="#" icon={<FacebookIcon size={18} />} />
              <SocialIcon href="#" icon={<TwitterIcon size={18} />} />
              <SocialIcon href="#" icon={<LinkedinIcon size={18} />} />
              <SocialIcon href="#" icon={<InstagramIcon size={18} />} />
            </div>

            <p className="text-sm mb-3">
              Subscribe for updates & announcements
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-[#050B17] border border-blue-500/20 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-400"
              />
              <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} Computer Society of India — SRMIST NCR
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-blue-400">
              Privacy
            </Link>
            <Link href="#" className="hover:text-blue-400">
              Terms
            </Link>
            <span>
              Built by{" "}
              <Link
                href="/coreTeam"
                className="text-blue-400 hover:text-blue-300"
              >
                Dev Team
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
