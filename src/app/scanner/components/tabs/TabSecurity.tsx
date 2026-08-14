'use client';

/**
 * TabSecurity – Contract, Authority, Trading & Liquidity Checks
 */

import { ScanResult } from '@/lib/scanner/types';
import { TabPanel, StatPanel, DataRow } from '../shared/ScannerUI';

interface TabSecurityProps {
  result: ScanResult;
}

export function TabSecurity({ result }: TabSecurityProps) {
  const { snifferData, advancedFeatures, market } = result;
  const { contract, auth, swap, liquidity, holders } = snifferData;

  return (
    <TabPanel tabId="security">
      <div className="ts-stats-grid ts-mb">
        <StatPanel title="Contract">
          <DataRow label="Verified" value={contract.verified} ok={contract.isSafe} />
          {contract.proxy && <DataRow label="Proxy" value={contract.proxy} />}
          {contract.creator && <DataRow label="Creator" value={contract.creator} />}
          {contract.createdAt && <DataRow label="Created" value={contract.createdAt} />}
        </StatPanel>

        <StatPanel title="Authority">
          <DataRow
            label="Mint"
            value={auth.mintDisabled ? 'DISABLED ✅' : 'ACTIVE ⚠️'}
            ok={auth.mintDisabled}
          />
          <DataRow
            label="Freeze"
            value={auth.freezeDisabled ? 'DISABLED ✅' : 'ACTIVE ⚠️'}
            ok={auth.freezeDisabled}
          />
          <DataRow
            label="Owner"
            value={auth.isRenounced ? 'RENOUNCED ✅' : 'ACTIVE ⚠️'}
            ok={auth.isRenounced}
          />
          {auth.metadataMutable && (
            <DataRow
              label="Metadata"
              value={auth.metadataMutable === 'YES' ? 'MUTABLE ⚠️' : 'IMMUTABLE ✅'}
              ok={auth.metadataMutable !== 'YES'}
            />
          )}
        </StatPanel>

        <StatPanel title="Trading">
          <DataRow
            label="Honeypot"
            value={advancedFeatures.simulation.canSell ? 'NO ✅' : 'YES 🚨'}
            ok={advancedFeatures.simulation.canSell}
          />
          <DataRow label="Tax" value={swap.tax} ok={swap.isSafe} />
          {swap.modifiable && (
            <DataRow label="Tax Mod" value={swap.modifiable} ok={swap.modifiable === 'NO'} />
          )}
          <DataRow
            label="Buy / Sell Tax"
            value={`${swap.buyTax}% / ${swap.sellTax}%`}
            ok={swap.buyTax <= 5 && swap.sellTax <= 5}
          />
          <DataRow
            label="Slippage"
            value={`${advancedFeatures.slippage.level} (${advancedFeatures.slippage.recommended})`}
            ok={advancedFeatures.slippage.level === 'LOW'}
          />
          <DataRow
            label="Liquidity Depth"
            value={`$${advancedFeatures.liquidityDepth.usd.toLocaleString()}`}
            ok={advancedFeatures.liquidityDepth.usd > 25000}
          />
          <DataRow label="LP Status" value={liquidity.status} ok={liquidity.isSafe} />
          <DataRow
            label="Blacklist"
            value={advancedFeatures.blacklist.hasBlacklist ? 'YES ⚠️' : 'NO ✅'}
            ok={!advancedFeatures.blacklist.hasBlacklist}
          />
        </StatPanel>

        <StatPanel title="Liquidity">
          <DataRow label="Burned" value={liquidity.burnedPercent} />
          <DataRow label="Locked" value={liquidity.lockedPercent} />
          <DataRow label="Total" value={`$${market.liquidity?.toLocaleString() ?? '0'}`} />
          <DataRow
            label="Holders Safe"
            value={holders.isSafe ? 'YES ✅' : 'NO ⚠️'}
            ok={holders.isSafe}
          />
        </StatPanel>
      </div>

      {liquidity.pools.length > 0 && (
        <div className="ts-panel">
          <div className="ts-panel-header">
            <span>💧 Liquidity Pools ({liquidity.pools.length})</span>
          </div>
          <div className="ts-panel-body">
            {liquidity.pools.map((pool, i) => (
              <div key={i} className="ts-row">
                <span className="ts-row-label">{pool.dex}</span>
                <span className="ts-row-value">
                  ${pool.liquidity.toLocaleString()}
                  {pool.link && (
                    <a
                      href={pool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ts-link-external"
                    >
                      ↗
                    </a>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </TabPanel>
  );
}

export default TabSecurity;