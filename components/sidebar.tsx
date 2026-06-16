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

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/projects", icon: ArrowUpRight, label: "Projects" },
  { href: "/experience", icon: Briefcase, label: "Experience" },
  { href: "/blogs", icon: PenLine, label: "Blogs" },
  { href: "/about", icon: User, label: "About" },
  { href: "/tools", icon: Wrench, label: "Tools" },
  { href: "/contact", icon: Mail, label: "Contact" },
];

const socialLinks = [
  {
    href: "#",
    label: "X.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "LinkedIn",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Github",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Medium",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 8l3 5 3-5 3 8" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

export function Sidebar() {
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
          <div className="text-sm text-[#6B7280]">Dev Stallion</div>
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
        {socialLinks.map(({ href, label, icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-[9px] px-2.5 py-2 rounded-[7px] text-sm text-[#111111] hover:bg-[#F3F4F6] transition-colors duration-100 max-sm:justify-center"
          >
            <span className="flex-shrink-0 text-[#111111]">
              {icon}
            </span>
            <span className="max-sm:hidden">{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
