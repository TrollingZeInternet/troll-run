'use client';

/**
 * ============================================================================
 * ScannerTabs – Horizontale Tab-Navigation
 * Phase 1b: Overview | Security | Holders | Advanced | Social
 * ============================================================================
 *
 * Mobile: horizontal scroll
 * Desktop: zentriert
 * Premium-Tabs (Social) zeigen 🔒-Badge via CSS-Klasse ts-tab--premium
 */

import { SCANNER_TABS, ScannerTabId } from '@/lib/scanner/types';

interface ScannerTabsProps {
  activeTab: ScannerTabId;
  onTabChange: (tab: ScannerTabId) => void;
}

export function ScannerTabs({ activeTab, onTabChange }: ScannerTabsProps) {
  return (
    <nav className="ts-tabs" role="tablist" aria-label="Scan results">
      {SCANNER_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const className = [
          'ts-tab',
          isActive && 'ts-tab--active',
          tab.premium && 'ts-tab--premium',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            className={className}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

export default ScannerTabs;
