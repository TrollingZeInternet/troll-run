'use client';

/**
 * Gemeinsame Scanner-UI-Bausteine (kein Duplikat in Tabs)
 */

import { ReactNode } from 'react';
import type { ScannerTabId } from '@/lib/scanner/types';

// ── Tab Panel Wrapper ──────────────────────────────────────────────────────

interface TabPanelProps {
  tabId: ScannerTabId;
  children: ReactNode;
}

export function TabPanel({ tabId, children }: TabPanelProps) {
  return (
    <div
      id={`tabpanel-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      className="ts-tabpanel"
    >
      {children}
    </div>
  );
}

// ── Stat Panel (Security-Tab) ─────────────────────────────────────────────────

export function StatPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="ts-panel">
      <div className="ts-panel-header">
        <span>{title}</span>
      </div>
      <div className="ts-panel-body">{children}</div>
    </div>
  );
}

// ── Data Row ─────────────────────────────────────────────────────────────────

export function DataRow({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok?: boolean;
}) {
  const valueClass =
    ok === undefined
      ? 'ts-row-value'
      : ok
        ? 'ts-row-value ts-row-value--ok'
        : 'ts-row-value ts-row-value--bad';

  return (
    <div className="ts-row">
      <span className="ts-row-label">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

// ── Market Row (Overview) ───────────────────────────────────────────────────

export function MarketRow({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: 'up' | 'down';
}) {
  const valueClass = [
    'ts-market-row__value',
    trend === 'up' && 'ts-market-row__value--up',
    trend === 'down' && 'ts-market-row__value--down',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className="ts-market-row">
      <span className="ts-market-row__label">{label}: </span>
      <span className={valueClass}>{value}</span>
    </p>
  );
}

// ── Holder List ───────────────────────────────────────────────────────────────

export function HolderList({
  items,
  compact,
}: {
  items: string[];
  compact?: boolean;
}) {
  return (
    <div className={`ts-holder-list${compact ? ' ts-holder-list--compact' : ''}`}>
      {items.map((info, i) => (
        <div key={i} className="ts-holder-list__item">
          <span className="ts-holder-list__rank">
            [{String(i + 1).padStart(2, '0')}]
          </span>
          <span className="ts-holder-list__text">{info}</span>
        </div>
      ))}
    </div>
  );
}

export function HolderStat({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="ts-holder-stat">
      <div className="ts-holder-stat__label">{label}</div>
      <div className={`ts-holder-stat__value${warn ? ' ts-holder-stat__value--warn' : ''}`}>
        {value}
      </div>
    </div>
  );
}

// ── Advanced Check Card ───────────────────────────────────────────────────────

export interface CheckCardData {
  icon: string;
  title: string;
  status: string;
  good: boolean;
  detail: string;
  extra?: string;
}

export function CheckCard({ icon, title, status, good, detail, extra }: CheckCardData) {
  return (
    <div className="ts-card">
      <div className="ts-check-card__header">
        <span className="ts-check-card__icon">{icon}</span>
        <div>
          <h4 className="ts-check-card__title">{title}</h4>
          <p className={`ts-check-card__status ${good ? 'ts-check-card__status--ok' : 'ts-check-card__status--bad'}`}>
            {status}
          </p>
        </div>
      </div>
      <p className="ts-check-card__detail">{detail}</p>
      {extra && <p className="ts-check-card__extra">{extra}</p>}
    </div>
  );
}