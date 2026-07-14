"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  ArrowUpRight,
  Briefcase,
  PenLine,
  User,
  Wrench,
  Mail,
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const profile = (
    <div className="flex flex-col items-center gap-2 px-2 mb-[22px] py-6">
      <div className="w-20 h-20 rounded-full bg-surface-2 flex-shrink-0 overflow-hidden">
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
      <div className="leading-none text-center">
        <div className="font-semibold text-ink mb-1">Alan Ari M.</div>
        <span className="text-sm text-subtle">Fullstack Developer · AI Engineer</span>
        {pathname !== "/" && (
          <div className="mt-2 flex justify-center">
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-green-950/80 text-green-400 border border-green-900/50">
              <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />
              Available
            </span>
          </div>
        )}
      </div>
    </div>
  );

  function renderNav(onNavigate?: () => void) {
    return (
      <nav className="flex flex-col gap-px">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-[9px] px-2.5 mx-2 my-0.5 py-2 rounded-[7px] text-sm font-medium transition-colors duration-100 ${
                active ? "bg-brand text-black" : "text-ink hover:bg-surface-2"
              }`}
            >
              <Icon size={15} className={`flex-shrink-0 ${active ? "text-black" : "text-ink"}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      {/* Desktop sidebar — unchanged, hidden on mobile */}
      <aside className="hidden sm:flex flex-col fixed top-0 left-0 bottom-0 w-[240px] bg-surface border-r border-line py-[18px] px-2.5 z-50 overflow-y-auto">
        {profile}
        {renderNav()}
      </aside>

      {/* Mobile hamburger trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="sm:hidden fixed top-4 left-4 z-[60] w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-ink"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile drawer backdrop — always mounted, toggled via opacity so the
          CSS transition (and the site-wide reduced-motion guard) can animate
          it without depending on JS-driven animation frames. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`sm:hidden fixed inset-0 bg-black/60 z-50 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile drawer */}
      <aside
        aria-hidden={!open}
        className={`sm:hidden fixed top-0 left-0 bottom-0 w-[240px] bg-surface border-r border-line flex flex-col py-[18px] px-2.5 z-[55] overflow-y-auto transition-transform duration-300 ease-snappy ${
          open ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        {profile}
        {renderNav(() => setOpen(false))}
      </aside>
    </>
  );
}
