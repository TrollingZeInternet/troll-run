'use client';

/**
 * ============================================================================
 * ScannerShell – Page-Layout & Branding-Wrapper
 * Mobile-First mit Safe-Area & kompaktem Header
 * ============================================================================
 */

import { ReactNode } from 'react';
import '../scanner.css';

interface ScannerShellProps {
  children: ReactNode;
  version?: string;
}

export function ScannerShell({ children, version = 'v2.0' }: ScannerShellProps) {
  return (
    <main className="ts-page ts-page--mobile">
      <div className="ts-bg-glow" aria-hidden="true" />

      <header className="ts-header">
        <div className="ts-scan-beam" aria-hidden="true" />

        <h1 className="ts-title">
          TROLL<span className="ts-title-accent">SCANNER</span>
        </h1>

        <p className="ts-subtitle">Make Memes Safe Again</p>

        {version && <span className="ts-version-badge">{version}</span>}
      </header>

      <div className="ts-container ts-shell-content safe-pad-x">
        {children}
      </div>

      <footer className="ts-footer safe-pad-bottom">
        powered by{' '}
        <a href="https://troll.run" rel="noopener noreferrer">
          troll.run
        </a>
        {' '}in honor of{' '}
        <a
          href="https://x.com/ERC20trolls"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ERC20Trolls
        </a>
      </footer>
    </main>
  );
}

export default ScannerShell;