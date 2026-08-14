'use client';

/**
 * ============================================================================
 * ScannerInput – Address-Eingabe + Chain-Picker + Scan-Button
 * Phase 1b: Nutzt SUPPORTED_CHAINS aus chainConfig (kein Inline-Duplikat)
 * ============================================================================
 */

import { useState, useRef, useEffect } from 'react';
import { SUPPORTED_CHAINS } from '@/lib/chainConfig';

interface ScannerInputProps {
  address: string;
  network: string;
  loading: boolean;
  onAddressChange: (value: string) => void;
  onNetworkChange: (value: string) => void;
  onScan: () => void;
}

export function ScannerInput({
  address,
  network,
  loading,
  onAddressChange,
  onNetworkChange,
  onScan,
}: ScannerInputProps) {
  const [showChains, setShowChains] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Aktuelle Chain für Icon/Farbe
  const activeChain = SUPPORTED_CHAINS.find(
    (c) => c.name.toLowerCase() === network.toLowerCase()
  ) ?? SUPPORTED_CHAINS[0];

  // Dropdown schließen bei Klick außerhalb
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowChains(false);
      }
    }
    if (showChains) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showChains]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && address) onScan();
  };

  return (
    <div className="ts-panel mb-8">
      {/* Chain-Picker Header */}
      <div className="ts-panel-header">
        <span>[NETWORK]</span>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="ts-chain-btn"
            onClick={() => setShowChains(!showChains)}
            aria-expanded={showChains}
            aria-haspopup="listbox"
          >
            <span>{activeChain.icon}</span>
            <span>{activeChain.name}</span>
            <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>
              {showChains ? '▲' : '▼'}
            </span>
          </button>

          {showChains && (
            <div className="ts-chain-dropdown" role="listbox">
              {SUPPORTED_CHAINS.map((chain) => {
                const isActive =
                  network.toLowerCase() === chain.name.toLowerCase();
                return (
                  <button
                    key={chain.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`ts-chain-option${isActive ? ' ts-chain-option--active' : ''}`}
                    onClick={() => {
                      onNetworkChange(chain.name);
                      setShowChains(false);
                    }}
                  >
                    <span className="ts-chain-option-icon">{chain.icon}</span>
                    <span
                      className="ts-chain-option-name"
                      style={{ color: chain.color }}
                    >
                      {chain.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Address Input + Scan Button */}
      <div className="ts-panel-body">
        <div className="ts-input-wrap">
          <span className="ts-input-prefix" aria-hidden="true">&gt;</span>
          <input
            type="text"
            className="ts-input"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="CONTRACT ADDRESS..."
            disabled={loading}
            aria-label="Contract Address"
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        <button
          type="button"
          className="ts-btn-scan"
          onClick={onScan}
          disabled={loading || !address}
        >
          {loading ? '◈ ANALYZING...' : '>>> SCAN <<<'}
        </button>
      </div>
    </div>
  );
}

export default ScannerInput;
