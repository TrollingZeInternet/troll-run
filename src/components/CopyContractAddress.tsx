"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CONTRACT_ADDRESS } from "@/lib/constants";

interface CopyContractAddressProps {
  variant?: "inline" | "centered";
  className?: string;
}

export default function CopyContractAddress({
  variant = "inline",
  className = "",
}: CopyContractAddressProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (variant === "centered") {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <code className="break-all text-base font-medium text-zinc-200 md:text-lg">
          {CONTRACT_ADDRESS}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-troll-green/30 bg-troll-green/10 px-5 py-2.5 text-sm font-semibold text-troll-green transition-all hover:border-troll-green/50 hover:bg-troll-green/20 hover:shadow-[0_0_24px_rgba(34,197,94,0.25)]"
          aria-label="Copy contract address"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Contract Address"}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 ${className}`}
    >
      <code className="flex-1 break-all text-left text-xs text-zinc-500 sm:text-sm">
        {CONTRACT_ADDRESS}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-troll-green/20 bg-troll-green/10 px-4 py-2.5 text-xs font-semibold text-troll-green transition-all hover:border-troll-green/40 hover:bg-troll-green/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        aria-label="Copy contract address"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied!" : "Copy CA"}
      </button>
    </div>
  );
}
