"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ArrowUpRight,
  Briefcase,
  PenLine,
  User,
  Wrench,
  Mail,
} from "lucide-react";
import { TypeAnimation } from 'react-type-animation';
import { SocialLinkIcon } from "./social-link-icon";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/projects", icon: ArrowUpRight, label: "Projects" },
  { href: "/experience", icon: Briefcase, label: "Experience" },
  { href: "/blogs", icon: PenLine, label: "Blogs" },
  { href: "/about", icon: User, label: "About" },
  { href: "/tools", icon: Wrench, label: "Tools" },
  { href: "/contact", icon: Mail, label: "Contact" },
];

type SocialLinkData = {
  id: string
  label: string
  url: string
  iconType: string
  iconValue: string
  order: number
}

export function Sidebar({ socialLinks }: { socialLinks: SocialLinkData[] }) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-[#EBEBEB] border-r border-[#E5E7EB] flex flex-col py-[18px] px-2.5 z-50 overflow-y-auto max-sm:w-14 max-sm:px-1.5">
      {/* Profile */}
      <div className="flex items-center gap-3 px-2 mb-[22px] py-8">
        <div className="w-[48px] h-[48px] rounded-full bg-[#D1D5DB] flex-shrink-0 overflow-hidden">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" fill="#D1D5DB" />
            <circle cx="24" cy="19" r="9" fill="#9CA3AF" />
            <ellipse cx="24" cy="42" rx="15" ry="11" fill="#9CA3AF" />
          </svg>
        </div>
        <div className="max-sm:hidden leading-none">
          <div className="font-semibold text-[#111111] mb-1">Alan</div>
        
            <TypeAnimation
              sequence={[
                "Fullstack",
                3000,
                "AI Enthusiast",
                3000,
                "Problem Solver",
                3000,
                "Lifelong Learner",
                3000,
                "AI Engineer",
                3000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "0.875rem", display: "inline-block", color:"#6B7280" }}
              repeat={Infinity}
            />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-px">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-[9px] px-2.5 mx-2 my-0.5 py-2 rounded-[7px] text-sm transition-colors duration-100 max-sm:justify-center ${
                active
                  ? "bg-[#111111] text-white"
                  : "text-[#111111] hover:bg-[#F3F4F6]"
              }`}
            >
              <Icon
                size={15}
                className={`flex-shrink-0 ${active ? "text-white" : "text-[#111111]"}`}
              />
              <span className="max-sm:hidden">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Connect */}
      <div className="text-base font-medium tracking-[0.04em] text-[#9CA3AF] px-2.5 mt-12 mb-1.5 max-sm:hidden">
        Connect
      </div>
      <div className="flex flex-col gap-px">
        {socialLinks.map(({ id, url, label, iconType, iconValue }) => (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[9px] px-2.5 py-2 rounded-[7px] text-sm text-[#111111] hover:bg-[#F3F4F6] transition-colors duration-100 max-sm:justify-center"
          >
            <span className="flex-shrink-0 text-[#111111]">
              <SocialLinkIcon iconType={iconType} iconValue={iconValue} size={15} />
            </span>
            <span className="max-sm:hidden">{label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
