'use client';

/**
 * TabAdvanced – Deep-Dive Security Checks
 */

import { ScanResult } from '@/lib/scanner/types';
import { TabPanel, CheckCard, CheckCardData } from '../shared/ScannerUI';

interface TabAdvancedProps {
  advanced: ScanResult['advancedFeatures'];
}

export function TabAdvanced({ advanced }: TabAdvancedProps) {
  const checks: CheckCardData[] = [
    {
      icon: '🔄',
      title: 'Honeypot Simulation',
      status: advanced.simulation.canSell ? 'PASSED' : 'FAILED',
      good: advanced.simulation.canSell,
      detail: advanced.simulation.details,
      extra: advanced.simulation.canBuy ? 'Buy: OK' : 'Buy: BLOCKED',
    },
    {
      icon: '💧',
      title: 'Liquidity Depth',
      status: advanced.liquidityDepth.rating,
      good: advanced.liquidityDepth.usd > 25000,
      detail: advanced.liquidityDepth.details,
      extra: `$${advanced.liquidityDepth.usd.toLocaleString()} USD`,
    },
    {
      icon: '🪙',
      title: 'Mint Authority',
      status: advanced.hiddenMint.hasMintAuthority ? 'ACTIVE' : 'DISABLED',
      good: !advanced.hiddenMint.hasMintAuthority,
      detail: advanced.hiddenMint.details,
      extra: advanced.hiddenMint.mintAuthority
        ? `Auth: ${advanced.hiddenMint.mintAuthority.slice(0, 10)}...`
        : undefined,
    },
    {
      icon: '⏸️',
      title: 'Pausability',
      status: advanced.pausability.canPause ? 'YES' : 'NO',
      good: !advanced.pausability.canPause,
      detail: advanced.pausability.details,
    },
    {
      icon: '🚫',
      title: 'Blacklist',
      status: advanced.blacklist.hasBlacklist ? 'YES' : 'NO',
      good: !advanced.blacklist.hasBlacklist,
      detail: advanced.blacklist.details,
    },
    {
      icon: '📉',
      title: 'Slippage Risk',
      status: advanced.slippage.level,
      good: advanced.slippage.level === 'LOW',
      detail: advanced.slippage.warning,
      extra: `Recommended: ${advanced.slippage.recommended}`,
    },
  ];

  if (advanced.contractAge) {
    checks.push({
      icon: '📅',
      title: 'Contract Age',
      status: `${advanced.contractAge.days}d`,
      good: advanced.contractAge.days > 7,
      detail: advanced.contractAge.details,
      extra: advanced.contractAge.createdAt,
    });
  }

  if (advanced.proxy) {
    checks.push({
      icon: '🔀',
      title: 'Proxy Contract',
      status: advanced.proxy.isProxy ? 'YES' : 'NO',
      good: !advanced.proxy.isProxy,
      detail: advanced.proxy.details,
      extra: advanced.proxy.implementation
        ? `Impl: ${advanced.proxy.implementation.slice(0, 10)}...`
        : undefined,
    });
  }

  if (advanced.antiWhale) {
    checks.push({
      icon: '🐋',
      title: 'Anti-Whale',
      status: advanced.antiWhale.enabled ? 'ENABLED' : 'DISABLED',
      good: advanced.antiWhale.enabled,
      detail: `Max TX: ${advanced.antiWhale.maxTx} · Max Wallet: ${advanced.antiWhale.maxWallet}`,
    });
  }

  return (
    <TabPanel tabId="advanced">
      <p className="ts-section-title">🔬 Advanced Checks</p>
      <div className="ts-advanced-grid">
        {checks.map((check) => (
          <CheckCard key={check.title} {...check} />
        ))}
      </div>
    </TabPanel>
  );
}

export default TabAdvanced;