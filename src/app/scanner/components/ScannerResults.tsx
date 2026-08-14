'use client';

/**
 * ScannerResults – Tab-Navigation + aktiver Tab-Content
 */

import type { ReactNode } from 'react';
import { ScanResult, ScannerTabId } from '@/lib/scanner/types';
import { ScannerTabs } from './ScannerTabs';
import {
  TabOverview,
  TabSecurity,
  TabHolders,
  TabAdvanced,
  TabSocial,
} from './tabs';

interface ScannerResultsProps {
  result: ScanResult;
  activeTab: ScannerTabId;
  onTabChange: (tab: ScannerTabId) => void;
}

const TAB_RENDERERS: Record<
  ScannerTabId,
  (result: ScanResult) => ReactNode
> = {
  overview: (r) => <TabOverview result={r} />,
  security: (r) => <TabSecurity result={r} />,
  holders: (r) => <TabHolders holders={r.snifferData.holders} />,
  advanced: (r) => <TabAdvanced advanced={r.advancedFeatures} />,
  social: () => <TabSocial />,
};

export function ScannerResults({ result, activeTab, onTabChange }: ScannerResultsProps) {
  return (
    <section aria-label="Scan results">
      <ScannerTabs activeTab={activeTab} onTabChange={onTabChange} />
      {TAB_RENDERERS[activeTab](result)}
    </section>
  );
}

export default ScannerResults;