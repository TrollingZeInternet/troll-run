/**
 * Mock ScanResult für lokale Integration-Tests (?mock=1 in der URL)
 */

import type { ScanResult } from '@/lib/scanner/types';

export const MOCK_SCAN_RESULT: ScanResult = {
  score: 78,
  riskLevel: 'LOW_RISK',
  warnings: [
    { severity: 'warning', message: 'Top 10 holders control 42% of supply', scoreImpact: -8 },
    { severity: 'info', message: 'Contract verified on Etherscan', scoreImpact: 5 },
  ],
  market: {
    symbol: 'TROVE',
    name: 'Trove Test Token',
    network: 'Ethereum',
    price: 0.00004269,
    priceChange24h: 12.4,
    liquidity: 185_420,
    marketCap: 1_250_000,
    volume24h: 89_300,
    fdv: 2_100_000,
    txns24h: { buys: 847, sells: 412 },
    pairAge: '14d',
  },
  snifferData: {
    contract: {
      label: 'Contract',
      verified: 'YES',
      proxy: 'NO',
      creator: '0xabc1...def2',
      createdAt: '2026-01-28',
      isSafe: true,
    },
    swap: {
      label: 'Swap',
      tax: '2% / 2%',
      buyTax: 2,
      sellTax: 2,
      modifiable: 'NO',
      isSafe: true,
    },
    auth: {
      label: 'Authority',
      mintDisabled: true,
      freezeDisabled: true,
      isRenounced: true,
      metadataMutable: 'NO',
      isSafe: true,
    },
    holders: {
      label: 'Holders',
      cexAnteil: '8.2%',
      depositAnteil: '3.1%',
      top10Real: '42.0%',
      top10LP: '12.5%',
      burnedSupply: '2.0%',
      specialInfo: [
        '0xdead...beef · 2.0% · BURN',
        '0x1234...5678 · 8.5% · WHALE',
      ],
      isSafe: true,
      cexCount: 2,
      depositCount: 1,
      whaleCount: 3,
      totalHolders: 4821,
      analyzedHolderCount: 50,
      cexList: [
        { name: 'Binance Hot', address: '0xbinance1234567890abcdef', percent: 4.2 },
        { name: 'OKX Deposit', address: '0xokxdeposit1234567890ab', percent: 4.0 },
      ],
      top10Holders: [
        { address: '0xdeadbeef00000000000000000000000001', label: 'Burn Address', percent: 2.0, type: 'burn' },
        { address: '0x1234567890abcdef1234567890abcdef12', label: 'Whale #1', percent: 8.5, type: 'big_whale' },
        { address: '0xabcdef1234567890abcdef1234567890ab', label: 'LP Pool', percent: 6.2, type: 'lp' },
      ],
    },
    liquidity: {
      label: 'Liquidity',
      burnedPercent: '45%',
      lockedPercent: '30%',
      status: 'LOCKED',
      pools: [
        { dex: 'Uniswap V2', pair: 'TROVE/WETH', liquidity: 142_000, link: 'https://etherscan.io' },
        { dex: 'Uniswap V3', pair: 'TROVE/WETH', liquidity: 43_420, link: 'https://etherscan.io' },
      ],
      isSafe: true,
    },
  },
  advancedFeatures: {
    simulation: {
      canBuy: true,
      canSell: true,
      details: 'Buy and sell simulation passed without revert.',
    },
    proxy: {
      isProxy: false,
      details: 'No proxy pattern detected.',
    },
    liquidityDepth: {
      usd: 185_420,
      rating: 'GOOD',
      details: 'Sufficient liquidity for moderate trades.',
    },
    hiddenMint: {
      hasMintAuthority: false,
      details: 'Mint authority renounced.',
    },
    pausability: {
      canPause: false,
      details: 'No pause function found.',
    },
    blacklist: {
      hasBlacklist: false,
      details: 'No blacklist mechanism detected.',
    },
    slippage: {
      level: 'LOW',
      recommended: '5%',
      warning: 'Low slippage risk for standard trade sizes.',
    },
    antiWhale: {
      enabled: true,
      maxTx: '1%',
      maxWallet: '2%',
    },
    contractAge: {
      days: 45,
      createdAt: '2026-01-28',
      details: 'Contract older than 7 days.',
    },
  },
  meta: {
    scanTime: 842,
    cached: false,
    version: '5.2',
    network: 'Ethereum',
    dataSource: 'MOCK',
  },
};