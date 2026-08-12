import { MessageCircle, BarChart3 } from "lucide-react";
import TrollfaceImage from "./TrollfaceImage";
import { ETHERSCAN_URL } from "@/lib/constants";

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { icon: XIcon, href: "https://x.com", label: "Twitter / X" },
  { icon: MessageCircle, href: "https://t.me", label: "Telegram" },
  { icon: BarChart3, href: ETHERSCAN_URL, label: "Etherscan" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#buy", label: "How to Buy" },
  { href: "#bridge", label: "Bridge" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#roadmap", label: "Roadmap" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-troll-green/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <TrollfaceImage size={40} rounded="full" />
              <span className="text-xl font-black text-white">
                TROLL<span className="text-troll-green">.RUN</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              The official home of TrollERC20 ($TROLL) on Ethereum. Troll
              responsibly. Not financial advice.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-troll-green"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white">
              Community
            </h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition-all hover:border-troll-green/40 hover:bg-troll-green/10 hover:text-troll-green hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} troll.run — All rights trolled.
          </p>
          <p className="text-xs text-zinc-600">
            TrollERC20 is a memecoin with no intrinsic value. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
