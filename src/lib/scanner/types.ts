/**
 * ============================================================================
 * TROVE TROLLSCANNER – Shared Types & Helpers
 * Phase 1a: Zentrale Type-Definitionen für Frontend-Komponenten
 * ============================================================================
 *
 * Re-exportiert Server-Types aus logic.ts + Frontend-spezifische Ergänzungen.
 * Verhindert Duplikation in page.tsx und Tab-Komponenten.
 */

// ── Server-Types (Single Source of Truth) ──────────────────────────────────
export type {
  ScanResult,
  Warning,
  MarketData,
  SnifferData,
  AdvancedFeatures,
  ScanMeta,
} from '@/app/api/scan/logic';

// ── Tab-Navigation ─────────────────────────────────────────────────────────
export type ScannerTabId =
  | 'overview'
  | 'security'
  | 'holders'
  | 'advanced'
  | 'social';

export interface ScannerTab {
  id: ScannerTabId;
  label: string;
  icon: string;
  /** Premium-Tabs zeigen Lock-Badge und Teaser-Content */
  premium?: boolean;
}

export const SCANNER_TABS: ScannerTab[] = [
  { id: 'overview',  label: 'Overview',  icon: '📊' },
  { id: 'security',  label: 'Security',  icon: '🛡️' },
  { id: 'holders',   label: 'Holders',   icon: '🐋' },
  { id: 'advanced',  label: 'Advanced',  icon: '🔬' },
  { id: 'social',    label: 'Social',    icon: '📡', premium: true },
];

// ── API Error Response ─────────────────────────────────────────────────────
export interface ScanApiError {
  error: string;
  message: string;
}

export type ScanError =
  | { type: 'validation'; message: string }
  | { type: 'api'; code: string; message: string }
  | { type: 'network'; message: string };

/** Normalisiert fetch-Responses in ein einheitliches ScanError-Format */
export function parseScanError(data: unknown, fallback = 'Unknown error'): ScanError {
  if (data && typeof data === 'object' && 'error' in data) {
    const err = data as ScanApiError;
    return { type: 'api', code: err.error, message: err.message || fallback };
  }
  return { type: 'network', message: fallback };
}

// ── Score Helpers ──────────────────────────────────────────────────────────
export type ScoreLevel = 'safe' | 'warning' | 'danger' | 'critical';

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 80) return 'safe';
  if (score >= 60) return 'warning';
  if (score >= 40) return 'danger';
  return 'critical';
}

export function getScoreClass(score: number): string {
  return `ts-score ts-score--${getScoreLevel(score)}`;
}

export function getScoreLabel(score: number): string {
  if (score >= 85) return 'SAFE';
  if (score >= 70) return 'LOW RISK';
  if (score >= 50) return 'MODERATE';
  if (score >= 30) return 'HIGH RISK';
  return score > 0 ? 'CRITICAL' : 'HONEYPOT';
}

// ── Severity CSS-Klasse ────────────────────────────────────────────────────
export function getSeverityClass(severity: string): string {
  const map: Record<string, string> = {
    info: 'ts-severity--info',
    warning: 'ts-severity--warning',
    danger: 'ts-severity--danger',
    critical: 'ts-severity--critical',
  };
  return `ts-severity ${map[severity] ?? 'ts-severity--info'}`;
}
