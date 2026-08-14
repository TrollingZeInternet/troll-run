'use client';

/**
 * TabOverview – Score, Market-Daten & Warnings
 */

import {
  ScanResult,
  getScoreClass,
  getScoreLabel,
  getSeverityClass,
} from '@/lib/scanner/types';
import { TabPanel, MarketRow } from '../shared/ScannerUI';

interface TabOverviewProps {
  result: ScanResult;
}

export function TabOverview({ result }: TabOverviewProps) {
  const { score, market, warnings, meta } = result;
  const priceTrend = market.priceChange24h >= 0 ? 'up' : 'down';

  return (
    <TabPanel tabId="overview">
      <div className="ts-meta">
        <span className={meta.cached ? 'ts-meta-badge ts-meta-badge--cached' : 'ts-meta-badge'}>
          {meta.cached ? '⚡ CACHED' : '🔄 FRESH'}
        </span>
        <span>{meta.scanTime}ms</span>
        <span>v{meta.version}</span>
        <span className="ts-meta-badge">{meta.dataSource}</span>
        <span className="ts-meta-badge">{meta.network}</span>
      </div>

      <div className="ts-panel ts-glow ts-mb">
        <div className="ts-panel-body ts-score-layout">
          <div className="ts-score-layout__market">
            <h2 className="ts-market-symbol">{market.symbol}</h2>
            <p className="ts-market-name">{market.name}</p>
            <div className="ts-market-grid">
              <MarketRow label="Network" value={market.network} />
              <MarketRow label="Price" value={`$${market.price?.toFixed(8) ?? '0'}`} />
              <MarketRow label="Liquidity" value={`$${market.liquidity?.toLocaleString() ?? '0'}`} />
              <MarketRow
                label="24h"
                value={`${market.priceChange24h?.toFixed(2) ?? '0'}%`}
                trend={priceTrend}
              />
              {market.marketCap > 0 && (
                <MarketRow label="MCap" value={`$${market.marketCap.toLocaleString()}`} />
              )}
              {market.volume24h > 0 && (
                <MarketRow label="Vol 24h" value={`$${market.volume24h.toLocaleString()}`} />
              )}
              {market.pairAge && <MarketRow label="Pair Age" value={market.pairAge} />}
              {market.txns24h && (
                <MarketRow
                  label="Txns 24h"
                  value={`${market.txns24h.buys}B / ${market.txns24h.sells}S`}
                />
              )}
            </div>
          </div>

          <div className="ts-score-layout__score">
            <div className={getScoreClass(score)}>{score}</div>
            <div className={`${getScoreClass(score)} ts-score-label`}>
              {getScoreLabel(score)}
            </div>
            <p className="ts-risk-label">
              Risk: {result.riskLevel.replace(/_/g, ' ')}
            </p>
          </div>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="ts-panel ts-mb">
          <div className="ts-panel-header">
            <span>⚠️ Warnings ({warnings.length})</span>
          </div>
          <div className="ts-panel-body ts-stack">
            {warnings.map((w, i) => (
              <div key={i} className={getSeverityClass(w.severity)}>
                {w.message}
                {w.scoreImpact !== 0 && (
                  <span className="ts-severity-impact">
                    ({w.scoreImpact > 0 ? '+' : ''}{w.scoreImpact})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </TabPanel>
  );
}

export default TabOverview;