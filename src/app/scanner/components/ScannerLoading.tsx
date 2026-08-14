'use client';

/**
 * ============================================================================
 * ScannerLoading – Loading-State während des Scans
 * Phase 1b: Spinner + animierte Progress-Bar + trollige Status-Messages
 * ============================================================================
 */

import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  'Scanning blockchain...',
  'Checking honeypot traps...',
  'Analyzing whale wallets...',
  'Reading contract bytecode...',
  'Consulting the trolls...',
  'Verifying liquidity pools...',
];

interface ScannerLoadingProps {
  /** Optionale Custom-Message (überschreibt Rotation) */
  message?: string;
}

export function ScannerLoading({ message }: ScannerLoadingProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  // Rotiert Status-Messages alle 2s
  useEffect(() => {
    if (message) return;
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [message]);

  const displayMessage = message ?? LOADING_MESSAGES[msgIndex];

  return (
    <div className="ts-loading" role="status" aria-live="polite">
      <div className="ts-spinner" aria-hidden="true" />
      <p className="ts-loading-text">{displayMessage}</p>
      <div className="ts-progress" aria-hidden="true">
        <div className="ts-progress-bar" />
      </div>
    </div>
  );
}

export default ScannerLoading;
