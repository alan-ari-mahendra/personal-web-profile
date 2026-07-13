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
    <aside className="fixed top-0 left-0 bottom-0 w-[240px] bg-surface border-r border-line flex flex-col py-[18px] px-2.5 z-50 overflow-y-auto max-sm:w-14 max-sm:px-1.5">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 px-2 mb-[22px] py-6 max-sm:py-3">
        <div className="w-20 h-20 rounded-full bg-surface-2 flex-shrink-0 overflow-hidden max-sm:w-9 max-sm:h-9">
          {imageUrl ? (
            <Image src={imageUrl} alt="Alan Ari M." width={80} height={80} className="w-full h-full object-cover" />
          ) : (
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="80" height="80" fill="#17181A" />
              <circle cx="40" cy="32" r="15" fill="#8A8A8A" />
              <ellipse cx="40" cy="70" rx="25" ry="18" fill="#8A8A8A" />
            </svg>
          )}
        </div>
        <div className="max-sm:hidden leading-none text-center">
          <div className="font-semibold text-ink mb-1">Alan Ari M.</div>
          <span className="text-sm text-subtle">AI Engineer · Full-Stack</span>
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
              className={`flex items-center gap-[9px] px-2.5 mx-2 my-0.5 py-2 rounded-[7px] text-sm font-medium transition-colors duration-100 max-sm:justify-center ${
                active
                  ? "bg-brand text-black"
                  : "text-ink hover:bg-surface-2"
              }`}
            >
              <Icon
                size={15}
                className={`flex-shrink-0 ${active ? "text-black" : "text-ink"}`}
              />
              <span className="max-sm:hidden">{label}</span>
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
