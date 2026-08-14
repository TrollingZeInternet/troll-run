'use client';

/**
 * TabHolders – HolderAnalysis Integration + Legacy specialInfo Fallback
 */

import { HolderAnalysis } from '@/components/HolderAnalysis';
import { ScanResult } from '@/lib/scanner/types';
import { TabPanel, HolderList, HolderStat } from '../shared/ScannerUI';

interface TabHoldersProps {
  holders: ScanResult['snifferData']['holders'];
}

export function TabHolders({ holders }: TabHoldersProps) {
  const hasStructuredData =
    (holders.top10Holders && holders.top10Holders.length > 0) ||
    (holders.cexList && holders.cexList.length > 0) ||
    holders.analyzedHolderCount !== undefined;

  return (
    <TabPanel tabId="holders">
      {hasStructuredData ? (
        <HolderAnalysis holders={holders} />
      ) : (
        <LegacyHolderList holders={holders} />
      )}

      {hasStructuredData && holders.specialInfo.length > 0 && (
        <div className="ts-panel ts-mt">
          <div className="ts-panel-header">
            <span>📋 Raw Holder Notes</span>
          </div>
          <div className="ts-panel-body">
            <HolderList items={holders.specialInfo} compact />
          </div>
        </div>
      )}
    </TabPanel>
  );
}

function LegacyHolderList({ holders }: { holders: TabHoldersProps['holders'] }) {
  const whaleConcentration = parseFloat(holders.top10Real) > 50;

  return (
    <div className="ts-panel">
      <div className="ts-panel-header">
        <span>🐋 Holders</span>
        <div className="ts-holder-stats">
          <HolderStat
            label="Total"
            value={
              holders.totalHolders > 0
                ? holders.totalHolders.toLocaleString()
                : 'Unknown'
            }
            warn={holders.totalHolders === 0}
          />
          <HolderStat label="CEX" value={holders.cexAnteil} />
          <HolderStat label="Whales" value={holders.top10Real} warn={whaleConcentration} />
          <HolderStat label="LP" value={holders.top10LP} />
          <HolderStat label="Burned" value={holders.burnedSupply} />
        </div>
      </div>

      <div className="ts-panel-body">
        <p className="ts-subsection-title">Top Holders</p>
        {holders.specialInfo.length > 0 ? (
          <HolderList items={holders.specialInfo} />
        ) : (
          <div className="ts-empty">⚠️ No holder data available</div>
        )}
      </div>
    </div>
  );
}

export default TabHolders;