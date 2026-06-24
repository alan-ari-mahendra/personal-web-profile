"use client";

import Link from "next/link";
import Image from "next/image";
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

export function Sidebar({ imageUrl }: { imageUrl?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-[#EBEBEB] border-r border-[#E5E7EB] flex flex-col py-[18px] px-2.5 z-50 overflow-y-auto max-sm:w-14 max-sm:px-1.5">
      {/* Profile */}
      <div className="flex items-center gap-3 px-2 mb-[22px] py-8">
        <div className="w-[48px] h-[48px] rounded-full bg-[#D1D5DB] flex-shrink-0 overflow-hidden">
          {imageUrl ? (
            <Image src={imageUrl} alt="Alan Ari M." width={48} height={48} className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" fill="#D1D5DB" />
              <circle cx="24" cy="19" r="9" fill="#9CA3AF" />
              <ellipse cx="24" cy="42" rx="15" ry="11" fill="#9CA3AF" />
            </svg>
          )}
        </div>
        <div className="max-sm:hidden leading-none">
          <div className="font-semibold text-[#111111] mb-1">Alan Ari M.</div>
          <span className="text-sm text-[#6B7280]">Full-stack Developer</span>
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

    </aside>
  );
}
