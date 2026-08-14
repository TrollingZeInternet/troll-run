'use client';

/**
 * Scanner State & Fetch-Logik – zentral für page.tsx
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ScanResult,
  ScanError,
  ScannerTabId,
  parseScanError,
} from '@/lib/scanner/types';
import { MOCK_SCAN_RESULT } from '@/lib/scanner/mockData';

interface UseScannerOptions {
  /** Lädt Mock-Daten statt API (via ?mock=1) */
  useMock?: boolean;
}

export function useScanner({ useMock = false }: UseScannerOptions = {}) {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('Ethereum');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<ScanError | null>(null);
  const [activeTab, setActiveTab] = useState<ScannerTabId>('overview');
  const abortRef = useRef<AbortController | null>(null);

  // Laufenden Request abbrechen bei Unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleAddressChange = useCallback((value: string) => {
    setAddress(value);
    setError(null);
  }, []);

  const handleNetworkChange = useCallback((value: string) => {
    setNetwork(value);
    setError(null);
  }, []);

  const handleTabChange = useCallback((tab: ScannerTabId) => {
    setActiveTab(tab);
  }, []);

  const handleScan = useCallback(async () => {
    const trimmed = address.trim();

    if (!trimmed || trimmed.length < 10) {
      setError({ type: 'validation', message: 'Enter a valid contract address' });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    setResult(null);
    setActiveTab('overview');

    try {
      if (useMock) {
        await new Promise((r) => setTimeout(r, 600));
        if (controller.signal.aborted) return;
        setResult({ ...MOCK_SCAN_RESULT, meta: { ...MOCK_SCAN_RESULT.meta, network } });
        return;
      }

      const res = await fetch(
        `/api/scan?address=${encodeURIComponent(trimmed)}&network=${encodeURIComponent(network)}`,
        { signal: controller.signal }
      );

      const data: unknown = await res.json();

      if (controller.signal.aborted) return;

      if (!res.ok || (data && typeof data === 'object' && 'error' in data)) {
        setError(parseScanError(data, 'Scan failed'));
        return;
      }

      setResult(data as ScanResult);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError({ type: 'network', message: 'Connection failed' });
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [address, network, useMock]);

  return {
    address,
    network,
    loading,
    result,
    error,
    activeTab,
    handleAddressChange,
    handleNetworkChange,
    handleTabChange,
    handleScan,
  };
}