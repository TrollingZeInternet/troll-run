// app/api/scan/logic.ts - TROLLSCANNER V5.2 FREE EDITION
// VollstÃ¤ndig kostenlose Version mit allen verfÃ¼gbaren APIs
// SOLANA HOLDER FIX: Nutzt Solscan Pro API + Helius Fallback

import { 
  getKnownWalletLabel, 
  isCEXWallet as isKnownCEXWallet,
  isDepositWallet as isKnownDepositWallet,
  isLPPool as isKnownLPPool,
  isBridge as isKnownBridge,
  isHackerWallet as isKnownHackerWallet,
  KNOWN_WALLETS_EVM,
  KNOWN_WALLETS_SOL
} from '@/lib/knownWallets';

// ========================================
// TYPES & INTERFACES
// ========================================
export interface ScanResult {
  score: number;
  riskLevel: 'SAFE' | 'LOW_RISK' | 'MODERATE' | 'HIGH_RISK' | 'CRITICAL' | 'HONEYPOT';
  warnings: Warning[];
  market: MarketData;
  snifferData: SnifferData;
  advancedFeatures: AdvancedFeatures;
  meta: ScanMeta;
}

export interface Warning {
  severity: 'info' | 'warning' | 'danger' | 'critical';
  message: string;
  scoreImpact: number;
}

export interface MarketData {
  symbol: string;
  name: string;
  network: string;
  price: number;
  priceChange24h: number;
  liquidity: number;
  marketCap: number;
  volume24h: number;
  fdv?: number;
  txns24h?: { buys: number; sells: number };
  pairAge?: string;
}

export interface SnifferData {
  contract: {
    label: string;
    verified: string;
    proxy?: string;
    creator?: string;
    createdAt?: string;
    isSafe: boolean;
  };
  swap: {
    label: string;
    tax: string;
    buyTax: number;
    sellTax: number;
    modifiable?: string;
    isSafe: boolean;
  };
  auth: {
    label: string;
    mintDisabled: boolean;
    freezeDisabled: boolean;
    isRenounced: boolean;
    metadataMutable?: string;
    isSafe: boolean;
  };
  holders: {
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
    // NEU: Erweiterte Daten
    cexList?: Array<{ name: string; address: string; percent: number }>;
    top10Holders?: Array<{ address: string; label: string; percent: number; type: string }>;
    analyzedHolderCount?: number;
  };
  liquidity: {
    label: string;
    burnedPercent: string;
    lockedPercent: string;
    status: string;
    pools: Array<{
      dex: string;
      pair: string;
      liquidity: number;
      link: string;
    }>;
    isSafe: boolean;
  };
}

export interface AdvancedFeatures {
  simulation: {
    canBuy: boolean;
    canSell: boolean;
    buyGas?: number;
    sellGas?: number;
    details: string;
  };
  proxy?: {
    isProxy: boolean;
    implementation?: string;
    details: string;
  };
  liquidityDepth: {
    usd: number;
    rating: string;
    details: string;
  };
  hiddenMint: {
    hasMintAuthority: boolean;
    mintAuthority?: string;
    details: string;
  };
  pausability: {
    canPause: boolean;
    details: string;
  };
  blacklist: {
    hasBlacklist: boolean;
    details: string;
  };
  slippage: {
    level: string;
    recommended: string;
    warning: string;
  };
  antiWhale?: {
    enabled: boolean;
    maxTx: string;
    maxWallet: string;
  };
  contractAge?: {
    days: number;
    createdAt: string;
    details: string;
  };
}

export interface ScanMeta {
  scanTime: number;
  cached: boolean;
  version: string;
  network: string;
  dataSource: string;
}

// ========================================
// CONSTANTS
// ========================================
const SCANNER_VERSION = '5.2.0-free';

// Chain Configuration
const CHAIN_CONFIG: Record<string, {
  chainId: string;
  name: string;
  explorer: string;
  explorerApi: string;
  nativeCurrency: string;
  dexScreenerId: string;
}> = {
  'eth': { chainId: '1', name: 'Ethereum', explorer: 'https://etherscan.io', explorerApi: 'https://api.etherscan.io/api', nativeCurrency: 'ETH', dexScreenerId: 'ethereum' },
  'bsc': { chainId: '56', name: 'BNB Chain', explorer: 'https://bscscan.com', explorerApi: 'https://api.bscscan.com/api', nativeCurrency: 'BNB', dexScreenerId: 'bsc' },
  'polygon': { chainId: '137', name: 'Polygon', explorer: 'https://polygonscan.com', explorerApi: 'https://api.polygonscan.com/api', nativeCurrency: 'MATIC', dexScreenerId: 'polygon' },
  'arbitrum': { chainId: '42161', name: 'Arbitrum', explorer: 'https://arbiscan.io', explorerApi: 'https://api.arbiscan.io/api', nativeCurrency: 'ETH', dexScreenerId: 'arbitrum' },
  'optimism': { chainId: '10', name: 'Optimism', explorer: 'https://optimistic.etherscan.io', explorerApi: 'https://api-optimistic.etherscan.io/api', nativeCurrency: 'ETH', dexScreenerId: 'optimism' },
  'base': { chainId: '8453', name: 'Base', explorer: 'https://basescan.org', explorerApi: 'https://api.basescan.org/api', nativeCurrency: 'ETH', dexScreenerId: 'base' },
  'avalanche': { chainId: '43114', name: 'Avalanche', explorer: 'https://snowtrace.io', explorerApi: 'https://api.snowtrace.io/api', nativeCurrency: 'AVAX', dexScreenerId: 'avalanche' },
  'fantom': { chainId: '250', name: 'Fantom', explorer: 'https://ftmscan.com', explorerApi: 'https://api.ftmscan.com/api', nativeCurrency: 'FTM', dexScreenerId: 'fantom' },
  'cronos': { chainId: '25', name: 'Cronos', explorer: 'https://cronoscan.com', explorerApi: 'https://api.cronoscan.com/api', nativeCurrency: 'CRO', dexScreenerId: 'cronos' },
  'linea': { chainId: '59144', name: 'Linea', explorer: 'https://lineascan.build', explorerApi: 'https://api.lineascan.build/api', nativeCurrency: 'ETH', dexScreenerId: 'linea' },
  'scroll': { chainId: '534352', name: 'Scroll', explorer: 'https://scrollscan.com', explorerApi: 'https://api.scrollscan.com/api', nativeCurrency: 'ETH', dexScreenerId: 'scroll' },
  'zksync': { chainId: '324', name: 'zkSync Era', explorer: 'https://explorer.zksync.io', explorerApi: 'https://block-explorer-api.mainnet.zksync.io/api', nativeCurrency: 'ETH', dexScreenerId: 'zksync' },
  'mantle': { chainId: '5000', name: 'Mantle', explorer: 'https://explorer.mantle.xyz', explorerApi: 'https://explorer.mantle.xyz/api', nativeCurrency: 'MNT', dexScreenerId: 'mantle' },
  'blast': { chainId: '81457', name: 'Blast', explorer: 'https://blastscan.io', explorerApi: 'https://api.blastscan.io/api', nativeCurrency: 'ETH', dexScreenerId: 'blast' },
  'solana': { chainId: 'solana', name: 'Solana', explorer: 'https://solscan.io', explorerApi: 'https://pro-api.solscan.io/v2.0', nativeCurrency: 'SOL', dexScreenerId: 'solana' }
};

// Known CEX Keywords
const CEX_KEYWORDS = [
  'Binance', 'Coinbase', 'Kraken', 'KuCoin', 'OKX', 'Bybit', 
  'MEXC', 'Gate.io', 'Bitfinex', 'Huobi', 'HTX', 'Upbit', 
  'Crypto.com', 'Gemini', 'Robinhood', 'Wintermute', 'Jump Trading',
  'FalconX', 'Ceffu', 'Poloniex', 'Bithumb', 'Deribit', 'Paxos', 
  'Revolut', 'Bullish', 'Bitstamp', 'Bitpanda', 'Coinone', 'Korbit',
  'Bitget', 'BingX', 'BitMEX', 'Bitbank', 'Bitkub', 'CoinEx'
];

// Known LP/DEX patterns
const LP_PATTERNS = ['Raydium', 'Orca', 'Jupiter', 'Meteora', 'Uniswap', 'PancakeSwap', 'SushiSwap', 'Curve', 'Balancer', 'Pool', 'LP', 'AMM'];

// Null/Burn addresses
const NULL_ADDRESSES = [
  '0x0000000000000000000000000000000000000000',
  '0x000000000000000000000000000000000000dead',
  '0xdead000000000000000042069420694206942069',
  '11111111111111111111111111111111',
  '1nc1nerator11111111111111111111111111111111'
];

// ========================================
// ERROR CLASS
// ========================================
export class ScannerError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'ScannerError';
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getApiKey(keyName: string): string | null {
  const key = process.env[keyName];
  return key && key.length > 5 ? key : null;
}

function isNullAddress(address: string): boolean {
  const normalized = address.toLowerCase();
  return NULL_ADDRESSES.some(null_addr => 
    normalized === null_addr.toLowerCase() ||
    normalized.includes('000000000000000000000000000000000000dead')
  );
}

function isCEXWallet(label: string): boolean {
  if (!label) return false;
  return CEX_KEYWORDS.some(keyword => label.toLowerCase().includes(keyword.toLowerCase()));
}

function isLPPool(label: string): boolean {
  if (!label) return false;
  return LP_PATTERNS.some(pattern => label.toLowerCase().includes(pattern.toLowerCase()));
}

function getExplorerLink(address: string, network: string): string {
  const config = CHAIN_CONFIG[network];
  if (!config) return `https://etherscan.io/address/${address}`;
  if (network === 'solana') return `https://solscan.io/account/${address}`;
  return `${config.explorer}/address/${address}`;
}

function calculateRiskLevel(score: number): ScanResult['riskLevel'] {
  if (score >= 85) return 'SAFE';
  if (score >= 70) return 'LOW_RISK';
  if (score >= 50) return 'MODERATE';
  if (score >= 30) return 'HIGH_RISK';
  if (score > 0) return 'CRITICAL';
  return 'HONEYPOT';
}

function calculatePairAge(pairCreatedAt: number | undefined): string {
  if (!pairCreatedAt) return 'Unknown';
  const now = Date.now();
  const diffMs = now - pairCreatedAt;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 365) return `${Math.floor(diffDays / 365)}y ${diffDays % 365}d`;
  if (diffDays > 0) return `${diffDays}d ${diffHours}h`;
  return `${diffHours}h`;
}

// ========================================
// SOLSCAN API (SOLANA) - MIT JWT TOKEN
// ========================================
interface SolscanHolder {
  owner: string;
  amount: number;
  decimals: number;
  rank: number;
}

interface SolscanTokenMeta {
  supply: string;
  decimals: number;
  holder: number;
  creator?: string;
  create_tx?: string;
}

async function fetchSolscanHolders(address: string): Promise<{
  holders: Array<{ address: string; amount: number; percent: number; rank: number }>;
  totalHolders: number;
  success: boolean;
}> {
  const solscanKey = getApiKey('SOLSCAN_API_KEY');
  
  if (!solscanKey) {
    console.log('[Solscan] No API key available');
    return { holders: [], totalHolders: 0, success: false };
  }

  try {
    // Fetch token holders from Solscan Pro API v2
    const holdersRes = await fetch(
      `https://pro-api.solscan.io/v2.0/token/holders?address=${address}&page=1&page_size=20`,
      {
        headers: {
          'accept': 'application/json',
          'token': solscanKey
        },
        signal: AbortSignal.timeout(10000)
      }
    );

    if (!holdersRes.ok) {
      console.log(`[Solscan] Holders API error: ${holdersRes.status}`);
      return { holders: [], totalHolders: 0, success: false };
    }

    const holdersData = await holdersRes.json();
    
    if (!holdersData.success || !holdersData.data) {
      console.log('[Solscan] No holder data in response');
      return { holders: [], totalHolders: 0, success: false };
    }

    // Fetch token meta for total supply
    const metaRes = await fetch(
      `https://pro-api.solscan.io/v2.0/token/meta?address=${address}`,
      {
        headers: {
          'accept': 'application/json',
          'token': solscanKey
        },
        signal: AbortSignal.timeout(5000)
      }
    );

    let totalSupply = 0;
    let totalHolders = 0;
    
    if (metaRes.ok) {
      const metaData = await metaRes.json();
      if (metaData.success && metaData.data) {
        totalSupply = parseFloat(metaData.data.supply || '0') / Math.pow(10, metaData.data.decimals || 9);
        totalHolders = metaData.data.holder || 0;
      }
    }

    // Process holders
    const holders = holdersData.data.map((h: SolscanHolder, index: number) => {
      const amount = h.amount / Math.pow(10, h.decimals || 9);
      const percent = totalSupply > 0 ? (amount / totalSupply) * 100 : 0;
      
      return {
        address: h.owner,
        amount,
        percent,
        rank: h.rank || index + 1
      };
    });

    console.log(`[Solscan] Found ${holders.length} holders, total: ${totalHolders}`);
    return { holders, totalHolders, success: true };

  } catch (error) {
    console.error('[Solscan] Error:', error);
    return { holders: [], totalHolders: 0, success: false };
  }
}

async function fetchSolscanTokenInfo(address: string): Promise<{
  creator?: string;
  createdAt?: string;
  supply?: number;
  decimals?: number;
  holder?: number;
} | null> {
  const solscanKey = getApiKey('SOLSCAN_API_KEY');
  
  if (!solscanKey) return null;

  try {
    const res = await fetch(
      `https://pro-api.solscan.io/v2.0/token/meta?address=${address}`,
      {
        headers: {
          'accept': 'application/json',
          'token': solscanKey
        },
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.success || !data.data) return null;

    return {
      creator: data.data.creator,
      createdAt: data.data.created_time ? new Date(data.data.created_time * 1000).toISOString() : undefined,
      supply: parseFloat(data.data.supply || '0'),
      decimals: data.data.decimals,
      holder: data.data.holder
    };
  } catch (error) {
    console.error('[Solscan Meta] Error:', error);
    return null;
  }
}

// ========================================
// HELIUS API (SOLANA FALLBACK)
// ========================================
async function fetchHeliusHolders(address: string): Promise<{
  holders: Array<{ address: string; amount: number; percent: number }>;
  success: boolean;
}> {
  const heliusKey = getApiKey('HELIUS_API_KEY');
  
  if (!heliusKey) {
    console.log('[Helius] No API key available');
    return { holders: [], success: false };
  }

  try {
    // Get largest token accounts
    const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'holders',
        method: 'getTokenLargestAccounts',
        params: [address]
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) return { holders: [], success: false };

    const data = await res.json();
    const accounts = data.result?.value || [];

    if (accounts.length === 0) {
      return { holders: [], success: false };
    }

    // Get token supply for percentage calculation
    const supplyRes = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'supply',
        method: 'getTokenSupply',
        params: [address]
      })
    });

    let totalSupply = 0;
    if (supplyRes.ok) {
      const supplyData = await supplyRes.json();
      totalSupply = parseFloat(supplyData.result?.value?.uiAmount || '0');
    }

    // Map accounts to holders with owner lookup
    const holders = await Promise.all(
      accounts.slice(0, 20).map(async (acc: { address: string; uiAmount: number }, index: number) => {
        // Get owner of token account
        let owner = acc.address;
        try {
          const ownerRes = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: `owner-${index}`,
              method: 'getAccountInfo',
              params: [acc.address, { encoding: 'jsonParsed' }]
            })
          });
          if (ownerRes.ok) {
            const ownerData = await ownerRes.json();
            owner = ownerData.result?.value?.data?.parsed?.info?.owner || acc.address;
          }
        } catch {
          // Keep token account address if owner lookup fails
        }

        const amount = acc.uiAmount || 0;
        const percent = totalSupply > 0 ? (amount / totalSupply) * 100 : 0;

        return { address: owner, amount, percent };
      })
    );

    console.log(`[Helius] Found ${holders.length} holders`);
    return { holders, success: true };

  } catch (error) {
    console.error('[Helius Holders] Error:', error);
    return { holders: [], success: false };
  }
}

async function fetchHeliusTokenInfo(address: string): Promise<{
  mintAuthority?: string;
  freezeAuthority?: string;
  supply?: number;
  decimals?: number;
} | null> {
  const heliusKey = getApiKey('HELIUS_API_KEY');
  if (!heliusKey) return null;

  try {
    const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${heliusKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'token-info',
        method: 'getAccountInfo',
        params: [address, { encoding: 'jsonParsed' }]
      }),
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) return null;

    const data = await res.json();
    const info = data.result?.value?.data?.parsed?.info;
    
    if (!info) return null;

    return {
      mintAuthority: info.mintAuthority,
      freezeAuthority: info.freezeAuthority,
      supply: parseFloat(info.supply || '0'),
      decimals: info.decimals
    };
  } catch (error) {
    console.error('[Helius Token Info] Error:', error);
    return null;
  }
}

// ========================================
// RUGCHECK API (SOLANA - KOSTENLOS)
// ========================================
interface RugCheckRisk {
  name: string;
  description: string;
  level: string;
  score: number;
}

interface RugCheckReport {
  score: number;
  risks: RugCheckRisk[];
  token?: {
    mint: string;
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
    lpLockedPct: number;
  };
  markets?: Array<{
    pubkey: string;
    marketType: string;
    liquidityA?: string;
    liquidityB?: string;
  }>;
  topHolders?: Array<{
    address: string;
    pct: number;
    owner?: string;
    uiAmount?: number;
  }>;
}

async function fetchRugCheck(address: string): Promise<RugCheckReport | null> {
  try {
    const res = await fetch(
      `https://api.rugcheck.xyz/v1/tokens/${address}/report/summary`,
      { signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) {
      console.log(`[RugCheck] API error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    console.log(`[RugCheck] Score: ${data.score}, Risks: ${data.risks?.length || 0}`);
    return data;
  } catch (error) {
    console.error('[RugCheck] Error:', error);
    return null;
  }
}

// ========================================
// GOPLUS API (EVM & SOLANA - KOSTENLOS)
// ========================================
interface GoPlusTokenSecurity {
  is_open_source?: string;
  is_proxy?: string;
  is_mintable?: string;
  owner_address?: string;
  creator_address?: string;
  can_take_back_ownership?: string;
  owner_change_balance?: string;
  hidden_owner?: string;
  selfdestruct?: string;
  external_call?: string;
  buy_tax?: string;
  sell_tax?: string;
  is_honeypot?: string;
  honeypot_with_same_creator?: string;
  transfer_pausable?: string;
  can_be_paused?: string;
  cannot_buy?: string;
  cannot_sell_all?: string;
  slippage_modifiable?: string;
  is_blacklisted?: string;
  is_whitelisted?: string;
  is_anti_whale?: string;
  anti_whale_modifiable?: string;
  trading_cooldown?: string;
  personal_slippage_modifiable?: string;
  is_true_token?: string;
  is_airdrop_scam?: string;
  trust_list?: string;
  other_potential_risks?: string;
  note?: string;
  holder_count?: string;
  total_supply?: string;
  holders?: Array<{
    address: string;
    tag?: string;
    is_contract?: number;
    balance?: string;
    percent?: string;
    is_locked?: number;
  }>;
  lp_holders?: Array<{
    address: string;
    tag?: string;
    is_contract?: number;
    balance?: string;
    percent?: string;
    is_locked?: number;
  }>;
  lp_total_supply?: string;
  dex?: Array<{
    name: string;
    liquidity?: string;
    pair?: string;
  }>;
}

async function fetchGoPlus(address: string, network: string): Promise<GoPlusTokenSecurity | null> {
  const config = CHAIN_CONFIG[network];
  if (!config) return null;

  try {
    const url = network === 'solana'
      ? `https://api.gopluslabs.io/api/v1/solana/token_security?contract_addresses=${address}`
      : `https://api.gopluslabs.io/api/v1/token_security/${config.chainId}?contract_addresses=${address.toLowerCase()}`;

    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });

    if (!res.ok) {
      console.log(`[GoPlus] API error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const tokenData = data.result?.[address.toLowerCase()] || data.result?.[address];
    
    if (tokenData) {
      console.log(`[GoPlus] Data found, honeypot: ${tokenData.is_honeypot}, holders: ${tokenData.holder_count}`);
    }
    
    return tokenData || null;
  } catch (error) {
    console.error('[GoPlus] Error:', error);
    return null;
  }
}

// ========================================
// DEXSCREENER API (KOSTENLOS)
// ========================================
interface DexPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: { address: string; name: string; symbol: string };
  quoteToken: { address: string; name: string; symbol: string };
  priceNative: string;
  priceUsd: string;
  liquidity: { usd: number; base: number; quote: number };
  fdv: number;
  marketCap: number;
  pairCreatedAt?: number;
  volume: { h24: number; h6: number; h1: number; m5: number };
  priceChange: { h24: number; h6: number; h1: number; m5: number };
  txns: {
    h24: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    m5: { buys: number; sells: number };
  };
  info?: {
    imageUrl?: string;
    websites?: { url: string }[];
    socials?: { type: string; url: string }[];
  };
}

async function fetchDexScreener(address: string): Promise<{ pairs: DexPair[]; mainPair: DexPair | null }> {
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`,
      { signal: AbortSignal.timeout(10000) }
    );

    if (!res.ok) {
      throw new ScannerError('DEX_API_ERROR', `DexScreener error: ${res.status}`);
    }

    const data = await res.json();
    const pairs = (data.pairs || []) as DexPair[];

    // Sort by liquidity
    const sortedPairs = [...pairs].sort((a, b) => 
      (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0)
    );

    console.log(`[DexScreener] Found ${sortedPairs.length} pairs`);
    return { pairs: sortedPairs, mainPair: sortedPairs[0] || null };
  } catch (error) {
    console.error('[DexScreener] Error:', error);
    throw new ScannerError('DEX_API_ERROR', 'DexScreener unavailable');
  }
}

// ========================================
// HOLDER ANALYSIS
// ========================================
interface HolderStats {
  cexTotal: number;
  depositTotal: number;
  whaleTotal: number;
  lpTotal: number;
  burnedTotal: number;
  details: string[];
  cexCount: number;
  depositCount: number;
  whaleCount: number;
  totalHolders: number;
  // NEU: Erweiterte Daten
  cexList: Array<{ name: string; address: string; percent: number }>;
  top10Holders: Array<{ address: string; label: string; percent: number; type: string }>;
  analyzedHolderCount: number;
}

async function analyzeHolders(
  holders: Array<{ address: string; percent: number; amount?: number; tag?: string }>,
  lpHolders: Array<{ address?: string; percent?: string }>,
  network: string,
  knownPairs: DexPair[],
  totalHolderCount: number
): Promise<HolderStats> {
  let cexTotal = 0, depositTotal = 0, whaleTotal = 0, lpTotal = 0, burnedTotal = 0;
  let cexCount = 0, depositCount = 0, whaleCount = 0;
  const details: string[] = [];
  const cexList: Array<{ name: string; address: string; percent: number }> = [];
  const top10Holders: Array<{ address: string; label: string; percent: number; type: string }> = [];

  if (!holders || holders.length === 0) {
    return {
      cexTotal: 0, depositTotal: 0, whaleTotal: 0, lpTotal: 0, burnedTotal: 0,
      details: ['No holder data available'],
      cexCount: 0, depositCount: 0, whaleCount: 0, totalHolders: totalHolderCount,
      cexList: [],
      top10Holders: [],
      analyzedHolderCount: 0
    };
  }

  const poolAddresses = new Set(knownPairs.map(p => p.pairAddress?.toLowerCase()).filter(Boolean));
  const lpAddresses = new Set((lpHolders || []).map(h => h.address?.toLowerCase()).filter(Boolean));

  // Erweiterte Analyse: bis zu 100 Holder für CEX-Erkennung
  const analyzedCount = Math.min(holders.length, 100);
  
  // Erste Schleife: Sammle alle CEX Wallets aus Top 100
  for (let i = 0; i < analyzedCount; i++) {
    const h = holders[i];
    if (!h?.address) continue;

    const addr = h.address.toLowerCase();
    const percent = h.percent || 0;
    
    const knownLabel = getKnownWalletLabel(h.address, network);
    const tag = h.tag || knownLabel || '';

    // Prüfe auf CEX Wallet
    if (knownLabel && isKnownCEXWallet(knownLabel, network)) {
      cexTotal += percent;
      cexCount++;
      cexList.push({
        name: knownLabel,
        address: h.address,
        percent: percent
      });
      continue;
    }
    
    if (isCEXWallet(tag)) {
      cexTotal += percent;
      cexCount++;
      cexList.push({
        name: tag,
        address: h.address,
        percent: percent
      });
      continue;
    }
  }

  // Zweite Schleife: Top 10 Holder im Detail analysieren
  for (let i = 0; i < Math.min(holders.length, 10); i++) {
    const h = holders[i];
    if (!h?.address) continue;

    const addr = h.address.toLowerCase();
    const percent = h.percent || 0;
    
    const knownLabel = getKnownWalletLabel(h.address, network);
    const tag = h.tag || knownLabel || '';
    const shortAddr = `${h.address.slice(0, 6)}...${h.address.slice(-4)}`;
    const displayLabel = knownLabel || tag || shortAddr;

    let holderType = 'holder';

    // Check for burn address
    if (isNullAddress(addr)) {
      burnedTotal += percent;
      holderType = 'burn';
      details.push(`[Burned]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: 'Burn Address', percent, type: holderType });
      continue;
    }

    // Check for hacker/scammer wallet
    if (knownLabel && isKnownHackerWallet(knownLabel, network)) {
      whaleTotal += percent;
      whaleCount++;
      holderType = 'hacker';
      details.push(`[${knownLabel}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }

    // Check for LP pool (prioritize known wallets check)
    if (knownLabel && isKnownLPPool(knownLabel, network)) {
      lpTotal += percent;
      holderType = 'lp';
      details.push(`[${knownLabel}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }
    
    if (poolAddresses.has(addr) || lpAddresses.has(addr) || isLPPool(tag)) {
      lpTotal += percent;
      holderType = 'lp';
      details.push(`[${tag || 'LP Pool'}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }

    // Check for CEX (prioritize known wallets check)
    if (knownLabel && isKnownCEXWallet(knownLabel, network)) {
      holderType = 'cex';
      details.push(`[${knownLabel}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }
    
    if (isCEXWallet(tag)) {
      holderType = 'cex';
      details.push(`[${tag}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }

    // Check for deposit wallet (prioritize known wallets check)
    if (knownLabel && isKnownDepositWallet(knownLabel, network)) {
      depositTotal += percent;
      depositCount++;
      holderType = 'deposit';
      details.push(`[${knownLabel}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }
    
    if (tag.toLowerCase().includes('deposit') || tag.toLowerCase().includes('hot wallet')) {
      depositTotal += percent;
      depositCount++;
      holderType = 'deposit';
      details.push(`[${tag}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }

    // Check for bridge
    if (knownLabel && isKnownBridge(knownLabel, network)) {
      whaleTotal += percent;
      if (percent > 1) whaleCount++;
      holderType = 'bridge';
      details.push(`[${knownLabel}]: ${percent.toFixed(2)}%`);
      top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
      continue;
    }

    // Regular holder (whale check)
    whaleTotal += percent;
    if (percent > 1) whaleCount++;

    if (percent > 5) {
      holderType = 'big_whale';
    } else if (percent > 2) {
      holderType = 'medium_whale';
    } else if (percent > 1) {
      holderType = 'small_whale';
    }

    const label = displayLabel;
    details.push(`[${label}]: ${percent.toFixed(2)}%`);
    top10Holders.push({ address: h.address, label: displayLabel, percent, type: holderType });
  }

  // WICHTIG: Verwende totalHolderCount, NUR wenn es 0 ist UND wir keine Daten haben,
  // dann zeige eine Warnung statt falscher Daten
  let finalTotalHolders = totalHolderCount;
  
  // Wenn totalHolderCount 0 ist, aber wir haben Holder-Daten, 
  // bedeutet das, dass die API die Gesamtzahl nicht liefert
  if (totalHolderCount === 0 && holders.length > 0) {
    // Setze auf 0 statt holders.length, damit im UI "Unknown" oder ähnliches angezeigt werden kann
    console.log(`[Warning] Total holder count unknown - API didn't provide it. Showing ${holders.length} top holders only.`);
    finalTotalHolders = 0; // 0 bedeutet "unbekannt", nicht 0 Holder
  }

  return {
    cexTotal,
    depositTotal,
    whaleTotal,
    lpTotal,
    burnedTotal,
    details,
    cexCount,
    depositCount,
    whaleCount,
    totalHolders: finalTotalHolders,
    cexList,
    top10Holders,
    analyzedHolderCount: analyzedCount
  };
}

// ========================================
// MAIN SCAN FUNCTION
// ========================================
export async function runFullScan(
  address: string,
  networkParam: string = 'eth'
): Promise<ScanResult> {
  const startTime = Date.now();

  // Validate address
  if (!address || address.length < 10) {
    throw new ScannerError('INVALID_ADDRESS', 'Invalid contract address');
  }

  // Detect network
  let network = networkParam.toLowerCase();
  const isEVM = address.startsWith('0x');
  const isSolana = !isEVM && address.length > 30;

  if (isSolana && network !== 'solana') network = 'solana';
  if (isEVM && network === 'solana') network = 'eth';

  console.log(`\nðŸ” [SCAN START] ${address.slice(0, 10)}... on ${network.toUpperCase()}`);

  // Fetch DexScreener data first
  const { pairs: allPairs, mainPair: pair } = await fetchDexScreener(address);
  
  if (!pair) {
    throw new ScannerError('TOKEN_NOT_FOUND', 'Token not found on DexScreener');
  }

  // Initialize score and warnings
  let score = 100;
  const warnings: Warning[] = [];
  let dataSource = 'DexScreener';

  // ========================================
  // PARALLEL DATA FETCHING
  // ========================================
  let security: GoPlusTokenSecurity | null = null;
  let rugCheck: RugCheckReport | null = null;
  let solscanHolders: { holders: Array<{ address: string; amount: number; percent: number; rank?: number }>; totalHolders: number; success: boolean } | null = null;
  let heliusInfo: { mintAuthority?: string; freezeAuthority?: string; supply?: number; decimals?: number } | null = null;
  let solscanInfo: { creator?: string; createdAt?: string; supply?: number; decimals?: number; holder?: number } | null = null;

  if (network === 'solana') {
    // Parallel fetch all Solana data sources
    const [securityRes, rugCheckRes, solscanHoldersRes, heliusInfoRes, solscanInfoRes] = await Promise.allSettled([
      fetchGoPlus(address, network),
      fetchRugCheck(address),
      fetchSolscanHolders(address),
      fetchHeliusTokenInfo(address),
      fetchSolscanTokenInfo(address)
    ]);

    security = securityRes.status === 'fulfilled' ? securityRes.value : null;
    rugCheck = rugCheckRes.status === 'fulfilled' ? rugCheckRes.value : null;
    solscanHolders = solscanHoldersRes.status === 'fulfilled' ? solscanHoldersRes.value : null;
    heliusInfo = heliusInfoRes.status === 'fulfilled' ? heliusInfoRes.value : null;
    solscanInfo = solscanInfoRes.status === 'fulfilled' ? solscanInfoRes.value : null;

    // If Solscan holders failed, try Helius as fallback
    if (!solscanHolders?.success) {
      console.log('[Fallback] Solscan failed, trying Helius for holders...');
      const heliusHolders = await fetchHeliusHolders(address);
      if (heliusHolders.success) {
        // WICHTIG: Helius liefert nur Top-Holder, nicht die Gesamtzahl
        // Versuche die echte Anzahl aus solscanInfo zu bekommen
        const realTotalHolders = solscanInfo?.holder || 0;
        solscanHolders = { 
          holders: heliusHolders.holders.map((h, i) => ({ ...h, rank: i + 1 })), 
          // Verwende die echte Anzahl aus solscanInfo, NIE holders.length als Fallback
          totalHolders: realTotalHolders,
          success: true 
        };
        dataSource += ' + Helius';
      }
    } else {
      dataSource += ' + Solscan';
    }

    if (rugCheck) dataSource += ' + RugCheck';
    if (security) dataSource += ' + GoPlus';

  } else {
    // EVM chains - just GoPlus
    security = await fetchGoPlus(address, network);
    if (security) dataSource += ' + GoPlus';
  }

  // ========================================
  // EXTRACT SECURITY VALUES
  // ========================================
  
  // For Solana - use multiple sources
  const isMintable = network === 'solana'
    ? !!(heliusInfo?.mintAuthority) || rugCheck?.risks?.some(r => r.name.toLowerCase().includes('mint'))
    : security?.is_mintable === '1';

  const canFreeze = network === 'solana'
    ? !!(heliusInfo?.freezeAuthority) || rugCheck?.risks?.some(r => r.name.toLowerCase().includes('freeze'))
    : security?.transfer_pausable === '1' || security?.can_be_paused === '1';

  const isVerified = network === 'solana' ? true : security?.is_open_source === '1';
  const isProxy = security?.is_proxy === '1';
  
  const ownerAddr = security?.owner_address;
  const isRenounced = network === 'solana'
    ? (!heliusInfo?.mintAuthority && !heliusInfo?.freezeAuthority)
    : (!ownerAddr || isNullAddress(ownerAddr));

  // Trading security
  const buyTax = parseFloat(security?.buy_tax || '0') * 100;
  const sellTax = parseFloat(security?.sell_tax || '0') * 100;
  const isHoneypot = security?.is_honeypot === '1';
  const cannotBuy = security?.cannot_buy === '1';
  const cannotSellAll = security?.cannot_sell_all === '1';
  const hasBlacklist = security?.is_blacklisted === '1';
  const hasHiddenOwner = security?.hidden_owner === '1';
  const hasSelfDestruct = security?.selfdestruct === '1';

  // ========================================
  // SCORING LOGIC
  // ========================================
  
  if (isHoneypot) {
    score = 0;
    warnings.push({ severity: 'critical', message: 'ðŸš¨ HONEYPOT DETECTED - Cannot sell!', scoreImpact: -100 });
  } else {
    // Contract Security
    if (hasHiddenOwner) {
      score -= 20;
      warnings.push({ severity: 'danger', message: 'ðŸš¨ Hidden owner detected', scoreImpact: -20 });
    }
    
    if (hasSelfDestruct) {
      score -= 25;
      warnings.push({ severity: 'critical', message: 'ðŸ’£ Self-destruct function found', scoreImpact: -25 });
    }
    
    if (!isVerified && network !== 'solana') {
      score -= 12;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Contract not verified', scoreImpact: -12 });
    }
    
    if (isProxy) {
      score -= 8;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Proxy contract - logic can change', scoreImpact: -8 });
    }
    
    if (isMintable) {
      score -= 12;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Minting is enabled - supply can increase', scoreImpact: -12 });
    }
    
    if (!isRenounced) {
      score -= 8;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Ownership not renounced', scoreImpact: -8 });
    }
    
    if (canFreeze) {
      score -= 10;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Freeze authority active - transfers can be blocked', scoreImpact: -10 });
    }
    
    if (hasBlacklist) {
      score -= 8;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Blacklist function detected', scoreImpact: -8 });
    }

    // Tax scoring
    const maxTax = Math.max(buyTax, sellTax);
    if (maxTax > 25) {
      score -= 30;
      warnings.push({ severity: 'critical', message: `ðŸš¨ Extreme tax: ${maxTax.toFixed(1)}%`, scoreImpact: -30 });
    } else if (maxTax > 15) {
      score -= 20;
      warnings.push({ severity: 'danger', message: `ðŸš¨ High tax: ${maxTax.toFixed(1)}%`, scoreImpact: -20 });
    } else if (maxTax > 10) {
      score -= 10;
      warnings.push({ severity: 'warning', message: `âš ï¸ Moderate tax: ${maxTax.toFixed(1)}%`, scoreImpact: -10 });
    } else if (maxTax > 5) {
      score -= 5;
      warnings.push({ severity: 'info', message: `â„¹ï¸ Tax: ${maxTax.toFixed(1)}%`, scoreImpact: -5 });
    }

    // Trading restrictions
    if (cannotSellAll) {
      score -= 25;
      warnings.push({ severity: 'critical', message: 'ðŸš¨ Cannot sell all tokens', scoreImpact: -25 });
    }
    
    if (security?.trading_cooldown === '1') {
      score -= 8;
      warnings.push({ severity: 'warning', message: 'âš ï¸ Trading cooldown active', scoreImpact: -8 });
    }

    // RugCheck specific risks for Solana
    if (rugCheck?.risks) {
      for (const risk of rugCheck.risks) {
        if (risk.level === 'danger' && !warnings.some(w => w.message.includes(risk.name))) {
          score -= risk.score || 10;
          warnings.push({ 
            severity: 'danger', 
            message: `ðŸš¨ ${risk.name}: ${risk.description}`, 
            scoreImpact: -(risk.score || 10) 
          });
        }
      }
    }
  }

  // ========================================
  // HOLDER ANALYSIS
  // ========================================
  let holders: Array<{ address: string; percent: number; amount?: number; tag?: string }> = [];
  let totalHolderCount = 0;

  if (network === 'solana' && solscanHolders?.success) {
    // Use Solscan/Helius data for Solana
    holders = solscanHolders.holders.map(h => ({
      address: h.address,
      percent: h.percent,
      amount: h.amount,
      tag: ''
    }));
    
    // WICHTIG: PrioritÃ¤t: solscanHolders.totalHolders > solscanInfo.holder > GoPlus holder_count > 0
    // NIEMALS holders.length verwenden!
    totalHolderCount = solscanHolders.totalHolders || solscanInfo?.holder || 0;
    
    // Versuche GoPlus als zusÃ¤tzliche Quelle fÃ¼r Solana
    if (totalHolderCount === 0 && security?.holder_count) {
      const goPlusCount = parseInt(security.holder_count || '0');
      if (goPlusCount > 0) {
        totalHolderCount = goPlusCount;
        console.log(`[Holders] Using GoPlus holder_count for Solana: ${totalHolderCount}`);
      }
    }
    
    // Log fÃ¼r Debugging
    if (totalHolderCount === 0) {
      console.log('[Warning] Total holder count is 0 - API did not provide total count');
      console.log(`[Holders] Top holders available: ${holders.length}, but total unknown`);
    } else {
      console.log(`[Holders] Total: ${totalHolderCount}, Top holders shown: ${holders.length}`);
    }
  } else if (security?.holders) {
    // Use GoPlus data for EVM (und Solana als Fallback)
    holders = security.holders.map(h => ({
      address: h.address,
      percent: parseFloat(h.percent || '0') * 100,
      tag: h.tag || ''
    }));
    
    // WICHTIG: Parse holder_count korrekt
    // Wenn holder_count leer, undefined, oder '0' ist, dann ist es 0 (unbekannt)
    const holderCountStr = security.holder_count || '';
    const parsedCount = holderCountStr ? parseInt(holderCountStr) : 0;
    totalHolderCount = parsedCount > 0 ? parsedCount : 0;
    
    // Log fÃ¼r Debugging
    if (totalHolderCount === 0) {
      console.log('[Warning] GoPlus holder_count is missing or invalid');
      console.log(`[Holders] GoPlus data: holder_count="${security.holder_count}", holders array length=${holders.length}`);
      console.log('[Holders] NOTE: Array length does NOT equal total holders - only showing top holders');
    } else {
      console.log(`[Holders] Total: ${totalHolderCount}, Top holders shown: ${holders.length}`);
    }
  }

  const lpHolders = security?.lp_holders || [];
  const holderStats = await analyzeHolders(holders, lpHolders, network, allPairs, totalHolderCount);

  // Whale concentration scoring
  if (holderStats.whaleTotal > 70) {
    score -= 15;
    warnings.push({ severity: 'danger', message: 'ðŸ‹ Very high whale concentration (>70%)', scoreImpact: -15 });
  } else if (holderStats.whaleTotal > 50) {
    score -= 10;
    warnings.push({ severity: 'warning', message: 'ðŸ‹ High whale concentration (>50%)', scoreImpact: -10 });
  } else if (holderStats.whaleTotal > 30) {
    score -= 5;
    warnings.push({ severity: 'info', message: 'ðŸ¦ˆ Moderate whale concentration (>30%)', scoreImpact: -5 });
  }

  // ========================================
  // LIQUIDITY ANALYSIS
  // ========================================
  const liquidityUSD = pair.liquidity?.usd || 0;
  const lpLockedPct = rugCheck?.token?.lpLockedPct || 0;
  
  // Check if LP is burned (first LP holder has >80%)
  const firstLpHolder = lpHolders[0];
  const lpBurned = firstLpHolder && isNullAddress(firstLpHolder.address || '') && 
                   parseFloat(firstLpHolder.percent || '0') * 100 > 80;

  let lpStatus = 'UNLOCKED âŒ';
  let lpStatusSafe = false;

  if (lpBurned) {
    lpStatus = 'BURNED ðŸ”¥';
    lpStatusSafe = true;
  } else if (lpLockedPct > 90) {
    lpStatus = `LOCKED ${lpLockedPct.toFixed(0)}% âœ…`;
    lpStatusSafe = true;
  } else if (lpLockedPct > 50) {
    lpStatus = `PARTIAL ${lpLockedPct.toFixed(0)}% âš ï¸`;
    lpStatusSafe = false;
  } else if (liquidityUSD > 100000 && isRenounced) {
    lpStatus = 'SAFE (High Liq + Renounced) âœ…';
    lpStatusSafe = true;
  }

  if (!lpStatusSafe) {
    score -= 15;
    warnings.push({ severity: 'warning', message: 'âš ï¸ Liquidity not locked', scoreImpact: -15 });
  }

  // Liquidity depth scoring
  if (liquidityUSD < 5000) {
    score -= 15;
    warnings.push({ severity: 'danger', message: 'ðŸš¨ Very low liquidity (<$5k)', scoreImpact: -15 });
  } else if (liquidityUSD < 10000) {
    score -= 10;
    warnings.push({ severity: 'warning', message: 'âš ï¸ Low liquidity (<$10k)', scoreImpact: -10 });
  } else if (liquidityUSD < 25000) {
    score -= 5;
    warnings.push({ severity: 'info', message: 'â„¹ï¸ Moderate liquidity (<$25k)', scoreImpact: -5 });
  }

  // ========================================
  // POSITIVE ADJUSTMENTS
  // ========================================
  if (liquidityUSD > 100000) {
    score += 5;
  }
  if (isRenounced && !isMintable && !canFreeze) {
    score += 5;
  }
  if (security?.trust_list === '1') {
    score += 5;
  }
  if (holderStats.cexTotal > 10) {
    score += 3; // CEX listings are generally positive
  }

  // Cap score
  score = Math.max(0, Math.min(100, score));

  // ========================================
  // BUILD RESULT
  // ========================================
  const pairAge = calculatePairAge(pair.pairCreatedAt);
  
  const result: ScanResult = {
    score,
    riskLevel: calculateRiskLevel(score),
    warnings,
    market: {
      symbol: (pair.baseToken?.symbol || 'UNKNOWN').toUpperCase(),
      name: pair.baseToken?.name || 'Unknown Token',
      network: CHAIN_CONFIG[network]?.name || network.toUpperCase(),
      price: parseFloat(pair.priceUsd || '0'),
      priceChange24h: pair.priceChange?.h24 || 0,
      liquidity: liquidityUSD,
      marketCap: pair.marketCap || pair.fdv || 0,
      volume24h: pair.volume?.h24 || 0,
      fdv: pair.fdv,
      txns24h: pair.txns?.h24,
      pairAge
    },
    snifferData: {
      contract: {
        label: 'Contract',
        verified: isVerified ? 'YES' : 'NO',
        proxy: isProxy ? 'YES' : 'NO',
        creator: solscanInfo?.creator || security?.creator_address,
        createdAt: solscanInfo?.createdAt,
        isSafe: isVerified && !isProxy && !hasHiddenOwner
      },
      swap: {
        label: 'Swap',
        tax: `Buy: ${buyTax.toFixed(1)}% | Sell: ${sellTax.toFixed(1)}%`,
        buyTax,
        sellTax,
        modifiable: isRenounced ? 'LOCKED' : 'MODIFIABLE',
        isSafe: buyTax <= 10 && sellTax <= 10 && !cannotSellAll
      },
      auth: {
        label: 'Authority',
        mintDisabled: !isMintable,
        freezeDisabled: !canFreeze,
        isRenounced,
        metadataMutable: rugCheck?.risks?.some(r => r.name.toLowerCase().includes('mutable')) ? 'YES' : 'NO',
        isSafe: isRenounced && !isMintable && !canFreeze
      },
      holders: {
        label: 'Holders',
        cexAnteil: `${holderStats.cexTotal.toFixed(1)}%`,
        depositAnteil: `${holderStats.depositTotal.toFixed(1)}%`,
        top10Real: `${holderStats.whaleTotal.toFixed(1)}%`,
        top10LP: `${holderStats.lpTotal.toFixed(1)}%`,
        burnedSupply: `${holderStats.burnedTotal.toFixed(1)}%`,
        specialInfo: holderStats.details,
        isSafe: holderStats.whaleTotal < 50,
        cexCount: holderStats.cexCount,
        depositCount: holderStats.depositCount,
        whaleCount: holderStats.whaleCount,
        totalHolders: holderStats.totalHolders,
        cexList: holderStats.cexList,
        top10Holders: holderStats.top10Holders,
        analyzedHolderCount: holderStats.analyzedHolderCount
      },
      liquidity: {
        label: 'Liquidity',
        burnedPercent: lpBurned ? '80%+' : '0%',
        lockedPercent: `${lpLockedPct.toFixed(1)}%`,
        status: lpStatus,
        pools: allPairs.slice(0, 5).map(p => ({
          dex: p.dexId || 'Unknown',
          pair: `${p.baseToken?.symbol || 'TKN'}/${p.quoteToken?.symbol || 'USD'}`,
          liquidity: p.liquidity?.usd || 0,
          link: getExplorerLink(p.pairAddress || '', network)
        })),
        isSafe: lpStatusSafe
      }
    },
    advancedFeatures: {
      simulation: {
        canBuy: !cannotBuy,
        canSell: !cannotSellAll && !isHoneypot,
        details: isHoneypot ? 'ðŸš¨ HONEYPOT - Cannot sell!' 
          : cannotSellAll ? 'âš ï¸ Cannot sell all tokens'
          : cannotBuy ? 'âš ï¸ Cannot buy'
          : 'âœ… Trading simulation passed'
      },
      proxy: {
        isProxy,
        details: isProxy ? 'âš ï¸ Proxy contract - logic can be changed' : 'âœ… Direct contract'
      },
      liquidityDepth: {
        usd: liquidityUSD,
        rating: liquidityUSD > 100000 ? 'EXCELLENT' 
          : liquidityUSD > 50000 ? 'GOOD'
          : liquidityUSD > 25000 ? 'MODERATE'
          : liquidityUSD > 10000 ? 'LOW'
          : 'VERY LOW',
        details: `$${liquidityUSD.toLocaleString()} total liquidity`
      },
      hiddenMint: {
        hasMintAuthority: !!isMintable,
        mintAuthority: heliusInfo?.mintAuthority,
        details: isMintable ? 'âš ï¸ Minting enabled - supply can increase' : 'âœ… Minting disabled'
      },
      pausability: {
        canPause: !!canFreeze,
        details: canFreeze ? 'âš ï¸ Can pause/freeze transfers' : 'âœ… Cannot pause transfers'
      },
      blacklist: {
        hasBlacklist,
        details: hasBlacklist ? 'âš ï¸ Blacklist function detected' : 'âœ… No blacklist'
      },
      slippage: {
        level: liquidityUSD < 10000 ? 'EXTREME' 
          : liquidityUSD < 25000 ? 'HIGH'
          : liquidityUSD < 50000 ? 'MODERATE'
          : 'LOW',
        recommended: liquidityUSD < 10000 ? '15-25%' 
          : liquidityUSD < 25000 ? '10-15%'
          : liquidityUSD < 50000 ? '5-10%'
          : '1-5%',
        warning: liquidityUSD < 10000 ? 'ðŸš¨ Very low liquidity - high slippage expected'
          : liquidityUSD < 25000 ? 'âš ï¸ Low liquidity - moderate slippage'
          : 'âœ… Good liquidity depth'
      },
      antiWhale: security?.is_anti_whale === '1' ? {
        enabled: true,
        maxTx: 'Enabled',
        maxWallet: 'Enabled'
      } : undefined,
      contractAge: pair.pairCreatedAt ? {
        days: Math.floor((Date.now() - pair.pairCreatedAt) / (1000 * 60 * 60 * 24)),
        createdAt: new Date(pair.pairCreatedAt).toISOString(),
        details: pairAge
      } : undefined
    },
    meta: {
      scanTime: Date.now() - startTime,
      cached: false,
      version: SCANNER_VERSION,
      network: network.toUpperCase(),
      dataSource
    }
  };

  console.log(`âœ… [SCAN COMPLETE] Score: ${result.score}, Time: ${result.meta.scanTime}ms, Source: ${dataSource}`);
  
  return result;
}