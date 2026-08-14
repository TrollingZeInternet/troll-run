// lib/chainConfig.ts - TROLLSCANNER V5.0 MULTI-CHAIN CONFIGURATION

// ========================================
// SUPPORTED CHAINS - TOP 15+
// ========================================
export interface ChainConfig {
    id: string;
    chainId: number;
    name: string;
    shortName: string;
    nativeCurrency: string;
    explorer: string;
    explorerApi: string;
    rpcUrl: string;
    goplusChainId: string;
    dexScreenerId: string;
    icon: string;
    color: string;
    isEVM: boolean;
  }
  
  export const CHAINS: { [key: string]: ChainConfig } = {
    // === LAYER 1 ===
    'eth': {
      id: 'eth',
      chainId: 1,
      name: 'Ethereum',
      shortName: 'ETH',
      nativeCurrency: 'ETH',
      explorer: 'https://etherscan.io',
      explorerApi: 'https://api.etherscan.io/api',
      rpcUrl: 'https://eth.llamarpc.com',
      goplusChainId: '1',
      dexScreenerId: 'ethereum',
      icon: '⟠',
      color: '#627EEA',
      isEVM: true
    },
    'bsc': {
      id: 'bsc',
      chainId: 56,
      name: 'BNB Smart Chain',
      shortName: 'BSC',
      nativeCurrency: 'BNB',
      explorer: 'https://bscscan.com',
      explorerApi: 'https://api.bscscan.com/api',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      goplusChainId: '56',
      dexScreenerId: 'bsc',
      icon: '🔶',
      color: '#F3BA2F',
      isEVM: true
    },
    'polygon': {
      id: 'polygon',
      chainId: 137,
      name: 'Polygon',
      shortName: 'MATIC',
      nativeCurrency: 'MATIC',
      explorer: 'https://polygonscan.com',
      explorerApi: 'https://api.polygonscan.com/api',
      rpcUrl: 'https://polygon-rpc.com',
      goplusChainId: '137',
      dexScreenerId: 'polygon',
      icon: '🟣',
      color: '#8247E5',
      isEVM: true
    },
    'avalanche': {
      id: 'avalanche',
      chainId: 43114,
      name: 'Avalanche C-Chain',
      shortName: 'AVAX',
      nativeCurrency: 'AVAX',
      explorer: 'https://snowtrace.io',
      explorerApi: 'https://api.snowtrace.io/api',
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
      goplusChainId: '43114',
      dexScreenerId: 'avalanche',
      icon: '🔺',
      color: '#E84142',
      isEVM: true
    },
    'fantom': {
      id: 'fantom',
      chainId: 250,
      name: 'Fantom',
      shortName: 'FTM',
      nativeCurrency: 'FTM',
      explorer: 'https://ftmscan.com',
      explorerApi: 'https://api.ftmscan.com/api',
      rpcUrl: 'https://rpc.ftm.tools',
      goplusChainId: '250',
      dexScreenerId: 'fantom',
      icon: '👻',
      color: '#1969FF',
      isEVM: true
    },
    'cronos': {
      id: 'cronos',
      chainId: 25,
      name: 'Cronos',
      shortName: 'CRO',
      nativeCurrency: 'CRO',
      explorer: 'https://cronoscan.com',
      explorerApi: 'https://api.cronoscan.com/api',
      rpcUrl: 'https://evm.cronos.org',
      goplusChainId: '25',
      dexScreenerId: 'cronos',
      icon: '🦁',
      color: '#002D74',
      isEVM: true
    },
  
    // === LAYER 2 ===
    'arbitrum': {
      id: 'arbitrum',
      chainId: 42161,
      name: 'Arbitrum One',
      shortName: 'ARB',
      nativeCurrency: 'ETH',
      explorer: 'https://arbiscan.io',
      explorerApi: 'https://api.arbiscan.io/api',
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      goplusChainId: '42161',
      dexScreenerId: 'arbitrum',
      icon: '🔵',
      color: '#28A0F0',
      isEVM: true
    },
    'optimism': {
      id: 'optimism',
      chainId: 10,
      name: 'Optimism',
      shortName: 'OP',
      nativeCurrency: 'ETH',
      explorer: 'https://optimistic.etherscan.io',
      explorerApi: 'https://api-optimistic.etherscan.io/api',
      rpcUrl: 'https://mainnet.optimism.io',
      goplusChainId: '10',
      dexScreenerId: 'optimism',
      icon: '🔴',
      color: '#FF0420',
      isEVM: true
    },
    'base': {
      id: 'base',
      chainId: 8453,
      name: 'Base',
      shortName: 'BASE',
      nativeCurrency: 'ETH',
      explorer: 'https://basescan.org',
      explorerApi: 'https://api.basescan.org/api',
      rpcUrl: 'https://mainnet.base.org',
      goplusChainId: '8453',
      dexScreenerId: 'base',
      icon: '🔵',
      color: '#0052FF',
      isEVM: true
    },
    'linea': {
      id: 'linea',
      chainId: 59144,
      name: 'Linea',
      shortName: 'LINEA',
      nativeCurrency: 'ETH',
      explorer: 'https://lineascan.build',
      explorerApi: 'https://api.lineascan.build/api',
      rpcUrl: 'https://rpc.linea.build',
      goplusChainId: '59144',
      dexScreenerId: 'linea',
      icon: '📐',
      color: '#61DFFF',
      isEVM: true
    },
    'scroll': {
      id: 'scroll',
      chainId: 534352,
      name: 'Scroll',
      shortName: 'SCROLL',
      nativeCurrency: 'ETH',
      explorer: 'https://scrollscan.com',
      explorerApi: 'https://api.scrollscan.com/api',
      rpcUrl: 'https://rpc.scroll.io',
      goplusChainId: '534352',
      dexScreenerId: 'scroll',
      icon: '📜',
      color: '#FFDBB0',
      isEVM: true
    },
    'zksync': {
      id: 'zksync',
      chainId: 324,
      name: 'zkSync Era',
      shortName: 'ZK',
      nativeCurrency: 'ETH',
      explorer: 'https://explorer.zksync.io',
      explorerApi: 'https://block-explorer-api.mainnet.zksync.io/api',
      rpcUrl: 'https://mainnet.era.zksync.io',
      goplusChainId: '324',
      dexScreenerId: 'zksync',
      icon: '⚡',
      color: '#8C8DFC',
      isEVM: true
    },
    'mantle': {
      id: 'mantle',
      chainId: 5000,
      name: 'Mantle',
      shortName: 'MNT',
      nativeCurrency: 'MNT',
      explorer: 'https://explorer.mantle.xyz',
      explorerApi: 'https://explorer.mantle.xyz/api',
      rpcUrl: 'https://rpc.mantle.xyz',
      goplusChainId: '5000',
      dexScreenerId: 'mantle',
      icon: '🏔️',
      color: '#000000',
      isEVM: true
    },
    'blast': {
      id: 'blast',
      chainId: 81457,
      name: 'Blast',
      shortName: 'BLAST',
      nativeCurrency: 'ETH',
      explorer: 'https://blastscan.io',
      explorerApi: 'https://api.blastscan.io/api',
      rpcUrl: 'https://rpc.blast.io',
      goplusChainId: '81457',
      dexScreenerId: 'blast',
      icon: '💥',
      color: '#FCFC03',
      isEVM: true
    },
  
    // === NON-EVM ===
    'solana': {
      id: 'solana',
      chainId: 0, // N/A
      name: 'Solana',
      shortName: 'SOL',
      nativeCurrency: 'SOL',
      explorer: 'https://solscan.io',
      explorerApi: 'https://public-api.solscan.io',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
      goplusChainId: 'solana',
      dexScreenerId: 'solana',
      icon: '◎',
      color: '#9945FF',
      isEVM: false
    },
    // Future: TON, SUI, APTOS, etc.
  };
  
  // ========================================
  // CHAIN HELPERS
  // ========================================
  
  export function getChainById(id: string): ChainConfig | null {
    return CHAINS[id.toLowerCase()] || null;
  }
  
  export function getChainByChainId(chainId: number): ChainConfig | null {
    return Object.values(CHAINS).find(c => c.chainId === chainId) || null;
  }
  
  export function getAllEVMChains(): ChainConfig[] {
    return Object.values(CHAINS).filter(c => c.isEVM);
  }
  
  export function getExplorerLink(address: string, network: string, type: 'address' | 'token' | 'tx' = 'address'): string {
    const chain = CHAINS[network.toLowerCase()];
    if (!chain) return `https://etherscan.io/${type}/${address}`;
    
    if (chain.id === 'solana') {
      const typeMap = { address: 'account', token: 'token', tx: 'tx' };
      return `${chain.explorer}/${typeMap[type]}/${address}`;
    }
    
    return `${chain.explorer}/${type}/${address}`;
  }
  
  export function getGoPlusChainId(network: string): string {
    return CHAINS[network.toLowerCase()]?.goplusChainId || '1';
  }
  
  export function getDexScreenerId(network: string): string {
    return CHAINS[network.toLowerCase()]?.dexScreenerId || 'ethereum';
  }
  
  // ========================================
  // API KEY MAPPING
  // ========================================
  export function getApiKeyEnvName(network: string): string {
    const keyMap: { [key: string]: string } = {
      'eth': 'ETHERSCAN_API_KEY',
      'bsc': 'BSCSCAN_API_KEY',
      'polygon': 'POLYGONSCAN_API_KEY',
      'arbitrum': 'ARBISCAN_API_KEY',
      'optimism': 'OPTIMISM_API_KEY',
      'base': 'BASESCAN_API_KEY',
      'avalanche': 'SNOWTRACE_API_KEY',
      'fantom': 'FTMSCAN_API_KEY',
      'cronos': 'CRONOSCAN_API_KEY',
      'linea': 'LINEASCAN_API_KEY',
      'scroll': 'SCROLLSCAN_API_KEY',
      'zksync': 'ZKSYNC_API_KEY',
      'mantle': 'MANTLESCAN_API_KEY',
      'blast': 'BLASTSCAN_API_KEY',
      'solana': 'SOLSCAN_API_KEY'
    };
    
    return keyMap[network.toLowerCase()] || 'ETHERSCAN_API_KEY';
  }
  
  // ========================================
  // NETWORK DETECTION
  // ========================================
  export function detectNetworkFromAddress(address: string): string {
    // Solana addresses are base58, 32-44 chars, no 0x prefix
    if (!address.startsWith('0x') && address.length >= 32 && address.length <= 44) {
      // Basic base58 check
      const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
      if (base58Regex.test(address)) {
        return 'solana';
      }
    }
    
    // EVM addresses are 42 chars with 0x prefix
    if (address.startsWith('0x') && address.length === 42) {
      return 'eth'; // Default to ETH for EVM addresses
    }
    
    return 'unknown';
  }
  
  // ========================================
  // UI HELPERS
  // ========================================
  export function getChainDisplayName(network: string): string {
    return CHAINS[network.toLowerCase()]?.name || network.toUpperCase();
  }
  
  export function getChainIcon(network: string): string {
    return CHAINS[network.toLowerCase()]?.icon || '🔗';
  }
  
  export function getChainColor(network: string): string {
    return CHAINS[network.toLowerCase()]?.color || '#627EEA';
  }
  
  // List for UI dropdown
  export const SUPPORTED_CHAINS = Object.entries(CHAINS).map(([id, config]) => ({
    id,
    name: config.name,
    shortName: config.shortName,
    icon: config.icon,
    color: config.color,
    isEVM: config.isEVM
  }));