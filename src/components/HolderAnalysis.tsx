'use client';

import React, { useState } from 'react';
import './HolderAnalysis.css';

// ========================================
// INTERFACES
// ========================================
interface CEXWallet {
  name: string;
  address: string;
  percent: number;
}

interface Top10Holder {
  address: string;
  label: string;
  percent: number;
  type: string;
}

interface HolderData {
  label: string;
  cexAnteil: string;
  depositAnteil: string;
  top10Real: string;
  top10LP: string;
  burnedSupply: string;
  specialInfo: string[];
  isSafe: boolean;
  cexCount: number;
  depositCount: number;
  whaleCount: number;
  totalHolders: number;
  cexList?: CEXWallet[];
  top10Holders?: Top10Holder[];
  analyzedHolderCount?: number;
}

interface HolderAnalysisProps {
  holders: HolderData;
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getHolderIcon(type: string): string {
  const icons: Record<string, string> = {
    'cex': '🏛️',
    'lp': '💧',
    'big_whale': '🐋',
    'medium_whale': '🦈',
    'small_whale': '🐠',
    'burn': '🔥',
    'hacker': '⚠️',
    'bridge': '🌉',
    'deposit': '📥',
    'holder': '👤'
  };
  return icons[type] || '👤';
}

function getHolderTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'cex': 'CEX',
    'lp': 'LP',
    'big_whale': 'WHALE',
    'medium_whale': 'WHALE',
    'small_whale': 'WHALE',
    'burn': 'BURN',
    'hacker': 'HACKER',
    'bridge': 'BRIDGE',
    'deposit': 'DEPOSIT',
    'holder': 'HOLDER'
  };
  return labels[type] || 'HOLDER';
}

function shortenAddress(address: string): string {
  if (!address || address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getExplorerLink(address: string, network: string = 'eth'): string {
  const explorers: Record<string, string> = {
    'eth': 'https://etherscan.io/address/',
    'bsc': 'https://bscscan.com/address/',
    'polygon': 'https://polygonscan.com/address/',
    'arbitrum': 'https://arbiscan.io/address/',
    'base': 'https://basescan.org/address/',
    'solana': 'https://solscan.io/account/'
  };
  const baseUrl = explorers[network] || explorers['eth'];
  return `${baseUrl}${address}`;
}

// ========================================
// MAIN COMPONENT
// ========================================
export function HolderAnalysis({ holders }: HolderAnalysisProps) {
  const [expandedSection, setExpandedSection] = useState<'cex' | 'top10' | null>(null);

  if (!holders) {
    return (
      <div className="holder-analysis holder-analysis--empty">
        <div className="holder-analysis__header">
          <span className="holder-analysis__icon">👥</span>
          <span className="holder-analysis__title">HOLDERS</span>
        </div>
        <div className="holder-analysis__empty-message">
          No holder data available
        </div>
      </div>
    );
  }

  const {
    cexAnteil,
    depositAnteil,
    top10Real,
    top10LP,
    burnedSupply,
    isSafe,
    cexCount,
    depositCount,
    whaleCount,
    totalHolders,
    cexList = [],
    top10Holders = [],
    analyzedHolderCount = 0
  } = holders;

  const displayTotalHolders = totalHolders > 0 
    ? totalHolders.toLocaleString() 
    : 'Unknown';

  return (
    <div className={`holder-analysis ${isSafe ? 'holder-analysis--safe' : 'holder-analysis--warning'}`}>
      {/* HEADER */}
      <div className="holder-analysis__header">
        <div className="holder-analysis__header-left">
          <span className="holder-analysis__icon">👥</span>
          <span className="holder-analysis__title">HOLDERS</span>
        </div>
        <div className="holder-analysis__header-right">
          <span className="holder-analysis__analyzed">
            📊 {analyzedHolderCount}/{displayTotalHolders} analyzed
          </span>
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div className="holder-analysis__summary">
        <div className="holder-analysis__stat">
          <span className="holder-analysis__stat-label">CEX</span>
          <span className="holder-analysis__stat-value">{cexAnteil}</span>
          <span className="holder-analysis__stat-sub">(Top {analyzedHolderCount})</span>
        </div>
        <div className="holder-analysis__stat-divider">│</div>
        <div className="holder-analysis__stat">
          <span className="holder-analysis__stat-label">WHALE</span>
          <span className="holder-analysis__stat-value">{top10Real}</span>
          <span className="holder-analysis__stat-sub">(Top 10)</span>
        </div>
        <div className="holder-analysis__stat-divider">│</div>
        <div className="holder-analysis__stat">
          <span className="holder-analysis__stat-label">LP</span>
          <span className="holder-analysis__stat-value">{top10LP}</span>
        </div>
      </div>

      {/* ADDITIONAL STATS ROW */}
      <div className="holder-analysis__extra-stats">
        {parseFloat(burnedSupply) > 0 && (
          <div className="holder-analysis__extra-stat">
            <span className="holder-analysis__extra-icon">🔥</span>
            <span>Burned: {burnedSupply}</span>
          </div>
        )}
        {parseFloat(depositAnteil) > 0 && (
          <div className="holder-analysis__extra-stat">
            <span className="holder-analysis__extra-icon">📥</span>
            <span>Deposit: {depositAnteil}</span>
          </div>
        )}
        <div className="holder-analysis__extra-stat">
          <span className="holder-analysis__extra-icon">🏛️</span>
          <span>{cexCount} CEX</span>
        </div>
        <div className="holder-analysis__extra-stat">
          <span className="holder-analysis__extra-icon">🐋</span>
          <span>{whaleCount} Whales</span>
        </div>
      </div>

      {/* CEX WALLETS SECTION */}
      {cexList && cexList.length > 0 && (
        <div className="holder-analysis__section">
          <button 
            className="holder-analysis__section-header"
            onClick={() => setExpandedSection(expandedSection === 'cex' ? null : 'cex')}
          >
            <span className="holder-analysis__section-icon">🏛️</span>
            <span className="holder-analysis__section-title">
              CEX WALLETS IN TOP {analyzedHolderCount}
            </span>
            <span className="holder-analysis__section-count">
              ({cexList.length} found)
            </span>
            <span className="holder-analysis__section-toggle">
              {expandedSection === 'cex' ? '▼' : '▶'}
            </span>
          </button>
          
          {expandedSection === 'cex' && (
            <div className="holder-analysis__section-content">
              {cexList.map((cex, idx) => (
                <div key={idx} className="holder-analysis__cex-item">
                  <span className="holder-analysis__cex-rank">[{String(idx + 1).padStart(2, '0')}]</span>
                  <span className="holder-analysis__cex-name">{cex.name}</span>
                  <span className="holder-analysis__cex-dots">{'·'.repeat(Math.max(1, 30 - cex.name.length))}</span>
                  <span className="holder-analysis__cex-percent">{cex.percent.toFixed(2)}%</span>
                  <a 
                    href={getExplorerLink(cex.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="holder-analysis__cex-link"
                    title={cex.address}
                  >
                    🔗
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TOP 10 HOLDERS SECTION */}
      {top10Holders && top10Holders.length > 0 && (
        <div className="holder-analysis__section">
          <button 
            className="holder-analysis__section-header"
            onClick={() => setExpandedSection(expandedSection === 'top10' ? null : 'top10')}
          >
            <span className="holder-analysis__section-icon">🔍</span>
            <span className="holder-analysis__section-title">TOP 10 HOLDERS</span>
            <span className="holder-analysis__section-toggle">
              {expandedSection === 'top10' ? '▼' : '▶'}
            </span>
          </button>
          
          {expandedSection === 'top10' && (
            <div className="holder-analysis__section-content">
              {top10Holders.map((holder, idx) => (
                <div 
                  key={idx} 
                  className={`holder-analysis__holder-item holder-analysis__holder-item--${holder.type}`}
                >
                  <span className="holder-analysis__holder-rank">#{String(idx + 1).padStart(2, '0')}</span>
                  <span className="holder-analysis__holder-icon">{getHolderIcon(holder.type)}</span>
                  <span className="holder-analysis__holder-label" title={holder.address}>
                    {holder.label}
                  </span>
                  <span className="holder-analysis__holder-dots">{'·'.repeat(Math.max(1, 25 - holder.label.length))}</span>
                  <span className="holder-analysis__holder-percent">{holder.percent.toFixed(2)}%</span>
                  <span className="holder-analysis__holder-type">[{getHolderTypeLabel(holder.type)}]</span>
                  <a 
                    href={getExplorerLink(holder.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="holder-analysis__holder-link"
                    title={holder.address}
                  >
                    🔗
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SAFETY INDICATOR */}
      <div className={`holder-analysis__safety ${isSafe ? 'holder-analysis__safety--safe' : 'holder-analysis__safety--warning'}`}>
        {isSafe ? (
          <>
            <span className="holder-analysis__safety-icon">✅</span>
            <span>Holder distribution OK (Top 10 Real &lt; 50%)</span>
          </>
        ) : (
          <>
            <span className="holder-analysis__safety-icon">⚠️</span>
            <span>High whale concentration — proceed with caution!</span>
          </>
        )}
      </div>
    </div>
  );
}

export default HolderAnalysis;
