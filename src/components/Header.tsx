"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X as CloseIcon } from "lucide-react";
import TrollfaceImage from "./TrollfaceImage";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/bridge", label: "Bridge" },
  { href: "/scanner", label: "Scanner" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/roadmap", label: "Roadmap" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="group flex items-center gap-3">
          <TrollfaceImage
            size={40}
            rounded="full"
            className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(34,197,94,0.6)]"
          />
          <span className="text-xl font-black tracking-tight text-white">
            TROLL<span className="text-troll-green">.RUN</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-troll-green ${
                  isActive ? "text-troll-green" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/bridge"
            className="btn-primary rounded-full px-6 py-2.5 text-sm font-bold text-black"
          >
            Buy TrollERC20
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-xl border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-troll-green/30 hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <CloseIcon size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/[0.06] bg-black/95 px-4 py-5 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-troll-green ${
                    isActive ? "text-troll-green bg-white/5" : "text-zinc-300"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/bridge"
              className="btn-primary mt-3 rounded-full py-3.5 text-center text-sm font-bold text-black"
              onClick={() => setOpen(false)}
            >
              Buy TrollERC20
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
