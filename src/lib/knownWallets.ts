// lib/knownWallets.ts - TROLLSCANNER V5.2 ENHANCED WALLET DETECTION
// Erkennt CEX, Deposits, Bridges, LPs auf ALLEN EVM Chains + SOLANA
// ========================================
// CEX & KNOWN ENTITY DETECTION
// ========================================

// Primary CEX Keywords (für Name-Matching)
export const CEX_KEYWORDS = [
  'Binance', 'Coinbase', 'Kraken', 'KuCoin', 'OKX', 'Bybit', 
  'MEXC', 'Gate.io', 'Bitfinex', 'Huobi', 'HTX', 'Upbit', 
  'Crypto.com', 'Gemini', 'Robinhood', 'Wintermute', 'Jump Trading',
  'FalconX', 'Ceffu', 'Poloniex', 'Bithumb', 'Deribit', 'Paxos', 
  'Revolut', 'Bullish', 'Bitstamp', 'Bitpanda', 'Coinone', 'Korbit',
  'Bitget', 'BingX', 'Bitmart', 'Phemex', 'Bitmex', 'Bitvavo',
  'LBank', 'Bitrue', 'ProBit', 'AscendEX', 'Kucoin', 'FTX', 
  'Alameda', 'Ascendex', 'Backpack', 'Coinlist'
];

// Deposit/Hot Wallet Patterns (für automatische Erkennung)
export const DEPOSIT_PATTERNS = [
  'Dep:', 'Deposit', 'Hot Wallet', 'Cold Wallet', 'Warm Wallet', 
  'Treasury', 'Custody', 'Vault', 'Reserve', 'MultiSig',
  'Wallet', 'Fund', 'Safe', 'Escrow', 'Cold Storage', 'Staking'
];

// LP/Pool Patterns (für DEX Liquidity Erkennung)
export const LP_PATTERNS = [
  'Pool', 'Liquidity', 'LP', 'Pair', 'V2:', 'V3:', 'V4:',
  'Raydium', 'Orca', 'Jupiter', 'Uniswap', 'PancakeSwap', 
  'SushiSwap', 'Curve', 'Balancer', 'Aerodrome', 'Velodrome',
  'Trader Joe', 'SpookySwap', 'SpiritSwap', 'QuickSwap',
  'Camelot', 'Thena', 'Solidly', 'Equalizer', 'AMM', 'Meteora',
  'Serum DEX', 'OpenBook'
];

// Bridge Patterns (für Cross-Chain Bridges)
export const BRIDGE_PATTERNS = [
  'Bridge', 'Portal', 'Gateway', 'Cross-Chain', 'LayerZero',
  'Wormhole', 'Stargate', 'Axelar', 'Synapse', 'Multichain',
  'Hop Protocol', 'Across', 'Celer', 'Connext', 'Orbiter'
];

// Hacker/Scam Patterns
export const HACKER_PATTERNS = [
  'Hacker', 'Exploiter', 'Scammer', 'Drainer', 'Compromise',
  'Exploit', 'Stolen', 'Fraud', 'Phishing', 'Rug'
];

// Bekannte Null/Burn Adressen - EVM
export const NULL_ADDRESSES_EVM = [
  '0x0000000000000000000000000000000000000000',
  '0x000000000000000000000000000000000000dead',
  '0xdead000000000000000042069420694206942069',
  '0x000000000000000000000000000000000000dEaD'
];

// Bekannte Null/Burn Adressen - Solana
export const NULL_ADDRESSES_SOL = [
  '11111111111111111111111111111111',
  '1nc1nerator11111111111111111111111111111111'
];

// ========================================
// EVM KNOWN WALLETS (0x Adressen)
// Funktioniert auf ALLEN EVM Chains
// ========================================
export const KNOWN_WALLETS_EVM: { [key: string]: string } = {
  "0x3dfd23a6c5e8bbcfc9581d2e864a68feb6a076d3": "Aave: Lending Pool Core V1",
  "0x905315602ed9a854e325f692ff82f58799beab57": "Alpha Homora V2 Exploiter",
  "0xc1ebd02f738644983b6c4b2d440b8e77dde276bd": "Arbitrum Nova: Bridge",
  "0x8315177ab297ba92a06054ce80a67ed4dbd7ed3a": "Arbitrum: Bridge",
  "0x247b57471ff9f4c99759ebca3adf59c1a8f3583c": "Argot Collective: Treasury",
  "0xa86e3d1c80a750a310b484fb9bdc470753a7506f": "Arthur Hayes 2",
  "0x604dd02d620633ae427888d41bfd15e38483736e": "Aster: Treasury",
  "0xd5524179cb7ae012f5b642c1d6d700bbaa76b96b": "Augur: Delegator",
  "0xe28e72fcf78647adce1f1252f240bbfaebd63bcc": "Augur: Token Sale",
  "0x64192819ac13ef72bf6b5ae239ac672b43a9af08": "Axie Infinity: Ronin Bridge V2",
  "0xff1f2b4adb9df6fc8eafecdcbf96a2b351680455": "Aztec: Connect",
  "0x737901bea3eeb88459df9ef1be8ff3ae1b42a2ba": "Aztec: Private Rollup Bridge",
  "0xc333e80ef2dec2805f239e3f1e810612d294f771": "B2C2 Group 1",
  "0xa1b1bbb8070df2450810b8eb2425d543cfcef79b": "BackAndAlive Donation Wallet",
  "0xe331821bc94187c2649e932810a60204699d45cb": "Bancor: Converter 739",
  "0x649765821d9f64198c905ec0b2b037a4a52bc373": "Bancor: Master Vault V3",
  "0x49048044d57e1c92a77f79988d21fa8faf74e97e": "Base: Base Portal",
  "0x5050f69a9786f081509234f1a7f4684b5e5b76c9": "Base: Batch Sender",
  "0x00000000219ab540356cbb839cbe05303d7705fa": "Beacon Deposit Contract",
  "0xa30d8157911ef23c46c0eb71889efe6a648a41f7": "BigONE",
  "0x4fdfe365436b5273a42f135c6a6244a20404271e": "Binance 106",
  "0x18e226459ccf0eec276514a4fd3b226d8961e4d1": "Binance 107",
  "0x4aec0e98fc1fb55b9cc2faaa7a81acca42cb4e96": "Binance 115",
  "0x43684d03d81d3a4c70da68febdd61029d426f042": "Binance 117",
  "0x28c6c06298d514db089934071355e5743bf21d60": "Binance 14",
  "0x21a31ee1afc51d94c2efccaa2092ad1028285549": "Binance 15",
  "0xdfd5293d8e347dfe59e90efd55b2956a1343963d": "Binance 16",
  "0x56eddb7aa87536c09ccc2793473599fd21a8b17f": "Binance 17",
  "0x9696f59e4d72e237be84ffd425dcad154bf96976": "Binance 18",
  "0x4976a4a02f38326660d17bf34b431dc6e2eb2327": "Binance 20",
  "0x5a52e96bacdabb82fd05763e25335261b270efcb": "Binance 28",
  "0x06a0048079ec6571cd1b537418869cde6191d42d": "Binance 29",
  "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8": "Binance 7",
  "0x835678a611b28684005a5e2233695fb6cbbb0007": "Binance 70",
  "0xa7c0d36c4698981fab42a7d8c783674c6fe2592d": "Binance 74",
  "0x98adef6f2ac8572ec48965509d69a8dd5e8bba9d": "Binance 93",
  "0xf60c2ea62edbfe808163751dd0d8693dcb30019c": "Binance US 3",
  "0xa74e8ae2f83d2564af25420ad4d6a7fe224b053f": "Binance US 9",
  "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503": "Binance: Binance-Peg Tokens",
  "0xf17aced3c7a8daa29ebb90db8d1b6efd8c364a18": "Binance: Eth2 Depositor 16",
  "0xf977814e90da44bfa03b6295a0616a897441acec": "Binance: Hot Wallet 20",
  "0x0b07f64abc342b68aec57c0936e4b6fd4452967e": "BingX 21",
  "0xa1195f0d9b010f86633e1553f1286d74f80ef52b": "BingX 22",
  "0xef317e433b0836f294866d43f67d6871b609b351": "BingX 39",
  "0x434742703055bd20f42142d9d70b0735a5eb1b14": "BingX 48",
  "0xbd02c51150a4ab6ce97b9de2025644594f3e75b8": "BitGo 1",
  "0x0323718324218dcbff7c9f89ba5a5954f61a6c74": "BitGo: WalletSimple Multisig Wallet",
  "0xeea81c4416d71cef071224611359f6f99a4c4294": "BitMEX 1",
  "0xe1e5f8cacc6b9ace0894fe7ba467328587e60be7": "BitVenus 8",
  "0x3727cfcbd85390bb11b3ff421878123adb866be8": "Bitbank 2",
  "0x7b4576d06d0ce1f83f9a9b76bf8077bffd34fcb1": "Bitcoin Suisse 1",
  "0x4ebf51689228236ec55bcafef9d79663992a7fb6": "Bitcoin Suisse 7",
  "0xc56fefd1028b0534bfadcdb580d3519b5586246e": "Bitfinex 11",
  "0x0b73f67a49273fc4b9a65dbd25d7d0918e734e63": "Bitfinex 12",
  "0x1b8766d041567eed306940c587e21c06ab968663": "Bitfinex 14",
  "0x5a710a3cdf2af218740384c52a10852d8870626a": "Bitfinex 15",
  "0x28140cb1ac771d4add91ee23788e50249c10263d": "Bitfinex 16",
  "0x53b36141490c419fa27ecabfeb8be1ecadc82431": "Bitfinex 17",
  "0x0cd76cd43992c665fdc2d8ac91b935ca3165e782": "Bitfinex 18",
  "0xe92d1a43df510f82c66382592a047d288f85226f": "Bitfinex 19",
  "0x742d35cc6634c0532925a3b844bc454e4438f44e": "Bitfinex 2",
  "0x8103683202aa8da10536036edef04cdd865c225e": "Bitfinex 20",
  "0x4fdd5eb2fb260149a3903859043e962ab89d8ed4": "Bitfinex 5",
  "0x77134cbc06cb00b66f4c7e623d5fdbf6777635ec": "Bitfinex: Hot Wallet",
  "0xc61b9bb3a7a0767e3179713f3a5c7a9aedce193c": "Bitfinex: MultiSig 2",
  "0x59708733fbbf64378d9293ec56b977c011a08fd2": "Bitget 23",
  "0x70213959a644baa94840bbfb4129550bceceb3c2": "Bitget 30",
  "0x54a679e853281a440911f72eae0e24107e9413dc": "Bitget 33",
  "0x1ab4973a48dc892cd9971ece8e01dcc7688f8f23": "Bitget 6",
  "0x17e5545b11b468072283cee1f066a059fb0dbf24": "Bithumb: Hot Wallet",
  "0x326d9f47ba49bbaac279172634827483af70a601": "Bitkub 1",
  "0xf8d3188e8349de474a2b086976cda158b4e109db": "Bitkub 20",
  "0xbb317c75f7ca98f830dd6f7eb1981852ebe6f839": "Bitkub 23",
  "0xdb044b8298e04d442fdbe5ce01b8cc8f77130e33": "Bitkub: Hot Wallet 1",
  "0x0529ea5885702715e83923c59746ae8734c553b7": "Bitpanda 18",
  "0xf197c6f2ac14d25ee2789a73e4847732c7f16bc9": "Bitpanda 4",
  "0xb10edd6fa6067dba8d4326f1c8f0d1c791594f13": "Bitpanda 5",
  "0xe3ecd65cf2ad2eba2aa2be1d0894753b2172abd1": "Bitso 3",
  "0xa01aa2196724a39290f465b3925e5dcafe7f2256": "Bitso 4",
  "0x182e1259ef6ee45dc811132ef4ba5871f1536822": "Bitstamp 12",
  "0x31c84a968736fcfe02a9ba274e0fa515a4a6659c": "Bitstamp 13",
  "0xee9fb7a615cb76b46d26be6ebc9114a627a81c5b": "Bitstamp 17",
  "0x6130611f7a65deb930bd0c0825af88078fcced43": "Bitstamp 21",
  "0x6778c14331251bbbee71414eda389dcef4bd81b8": "Bitstamp 22",
  "0xab09b0c5c112999bee4f45e323c4ad2b59638603": "Bitstamp 32",
  "0xab7bb7959332888e44d795c6f28ee876a8469eaa": "Bitstamp 33",
  "0xb66410ae75317faf13dba869b6df7b30892d1e46": "Bitstamp 34",
  "0xcddf488f1c826160ee832d4f1492f00cf8557ff6": "Bitstamp 39",
  "0xee7c0bf91f9ac8117b490c8e028714acbcb41364": "Bitstamp 44",
  "0x0b0f7ebf967146566799229394171fc47f1a765a": "Bitstamp 45",
  "0x3d9256ad37128e9f47b34a82e06e981719477c18": "Bitstamp 48",
  "0x4c766def136f59f6494f0969b1355882080cf8e0": "Bitstamp 5",
  "0x273a4db9f7cb388ec216df8c347f0529b22f4bd8": "Bitstamp 50",
  "0x4cc61daed7824ff8b5081f204e16bea330c2eeab": "Bitstamp 58",
  "0xa3f74537f048b893d726c173cb322fd21a28b18a": "Bitstamp 60",
  "0x7f604d597c15b2e2f60dc645844f68b1d781b752": "Bitstamp 61",
  "0x379825f8da776b573a63404a5c499c8a379a131f": "Bitstamp 7",
  "0x9b797341520c5baa1f72c060e6390996908e1a82": "Bittrex 4",
  "0xd2674da94285660c9b2353131bef2d8211369a4b": "Bitvavo 15",
  "0x7269bc4a66c755b951f068626201090f0c3098e9": "Bitvavo 1",
  "0x70e1fc72de740a9353bd9c4674af192f40a24540": "Bitvavo: Coinbase Prime Custody 6",
  "0xedc6bacdc1e29d7c5fa6f6eca6fdd447b9c487c9": "Bitvavo: Cold 1",
  "0x6c3197c9f3954b682b0e64b520e6da5fe74fcf8b": "BlackFort Genesis Knights: BXKNIGHTS Token",
  "0x98078db053902644191f93988341e31289e1c8fe": "Blast: ETH Yield Manager Proxy",
  "0x22ffda6813f4f34c520bf36e5ea01167bc9df159": "BlockFi 8",
  "0x0000000000a39bb272e79075ade125fd351887ac": "Blur: Bidding",
  "0x76ec5a0d3632b2133d9f1980903305b62678fbd3": "BtcTurk 13",
  "0x367c42a6f261ec54ffbecf5f41c226be12a3dca0": "Bullish 1",
  "0x100ae042ef0ea159ecc3513e9a378ff21f3829ba": "Bullish 2",
  "0x0ac9fce7636af8fa933068a3a5ecb71f8177c4f3": "Bullish: MultiSig 4",
  "0x0edae87c15fcbfde1f1900360830a4a4f3c438fa": "ByBit Dep: 0x0EdAE87C15fcBFDe1f1900360830A4A4F3C438FA",
  "0xcab3f132a11e5b723fc20ddab8bb1b858d00a8e8": "Bybit 21",
  "0xee5b5b923ffce93a870b3104b7ca09c3db80047a": "Bybit: Hot Wallet",
  "0x1db92e2eebc8e0c075a02bea49a2935bcd2dfcf4": "ByBit: Hot Wallet",
  "0xf89d7b9c864f589bbf53a82105107622b35eaa40": "Bybit: Hot Wallet 2",
  "0x4b54bd5a5ae1ea4c57bbc1e02ceb8ca82c97e4b2": "C2X: Wallet 2",
  "0xa910f92acdaf488fa6ef02174fb86208ad7722ba": "Changelly 3",
  "0x38b78904a6b44f05414bc2a2c6da762ba39cd41c": "Circle 2",
  "0x075e72a5edf65f0a5f44699c7654c1a76941ddc8": "Circle 6",
  "0x5041ed759dd4afc3a72b8192c143f72f4724081a": "Coinbase 10",
  "0x9cd83be15a79646a3d22b81fc8ddf7b7240a62cb": "Coinbase 11",
  "0x02466e547bfdab679fc49e96bbfc62b9747d997c": "Coinbase 4",
  "0x4e5b2e1dc63f6b91cb6cd759936495434c7e972f": "Coinbase 6",
  "0x881d4032abe4188e2237efcd27ab435e81fc6bb1": "Coinbase 7",
  "0xb9fa6e54025b4f0829d8e1b42e8b846914659632": "Coinbase Commerce 2",
  "0x503828976d22510aad0201ac7ec88293211d23da": "Coinbase: Deposit",
  "0xcd6d7e08d4dba0b1979bb74e91e8e8ec92b23d37": "CoinList 2",
  "0x3f0bbe397962ec8ffdb19cf5b90a7edc96dc18aa": "CoinMetro 2",
  "0x1680c589cee535e1d4fe02a52c1edf5b86348e31": "CoinMetro: Deposit Wallet",
  "0x77ab999d1e9f152156b4411e1f3e2a42dab8cd6d": "CoinSpot 1",
  "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be": "Crypto.com 1",
  "0x6262998ced04146fa42253a5c0af90ca02dfd2a3": "Crypto.com 2",
  "0x46340b20830761efd32832a74d7169b29feb9758": "Crypto.com 3",
  "0xcffad3200574698b78f32232aa9d63eabd290703": "Crypto.com 4",
  "0x72a53cdbbcc1b9efa39c834a540550e23463aacb": "Crypto.com 5",
  "0x7758e507850da48cd47df1fb5f875c23e3340c50": "Crypto.com 6",
  "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43": "Crypto.com: Cold Wallet",
  "0xd7b9a9b2f665849c4071ad5af77d8c76aa30fb32": "dYdX: Governance Treasury",
  "0xe5d0ef77aed07c302634dc370537126a2cd26590": "dYdX: Rewards Treasury",
  "0x19ce9f726c8b5cd09bc7d93da7a9b19a6cd5f022": "Deribit 4",
  "0x91dce850c9a46ed4bcf24fa30dd2c7dbdbf7d664": "Deribit 6",
  "0xbe9292abb71de456f24b1c20c8308dcd46c83ea7": "Digix: Treasury",
  "0x4fbb899d34a3b6e8c7f9af8fe29b21d19b1c8545": "FTX 1",
  "0xd1669ac6044269b59fa12c5822439f609ca54f41": "FalconX 2",
  "0x3507e4978e0eb83315d20df86ca0b976c0e40ccb": "FalconX 3",
  "0x14eba5f380ffa77ecb8942484a3aac8341e1c22a": "Fold 2",
  "0xcf57a3b1c076838116731f7e9b8954c6ef8ea766": "Frax: Comptroller Multi-Sig",
  "0xba12222222228d8ba445958a75a0704d566bf2c8": "Balancer: Vault",
  "0x4d42cae7e1fe3d6e3e96663f5139b70ee19c2f64": "GMX: Ecosystem Fund",
  "0x908c4d94d34924765f1edc22a1dd098397c59dd4": "Gate.io 1",
  "0xd793281182a0e3e023116004778f45c29fc14f19": "Gate.io 3",
  "0x0d0707963952f2fba59dd06f2b425ace40b492fe": "Gate.io 4",
  "0x7793cd85c11a924478d358d49b05b37e91b5810f": "Gate.io 5",
  "0x1c4b70a3968436b9a0a9cf5205c787eb81bb558c": "Gate.io 6",
  "0x234ee9e35f8e9749a002fc42970d570db716453b": "Gate.io 8",
  "0xd24400ae8bfebb18ca49be86258a3c749cf46853": "Gemini 1",
  "0x6fc82a5fe25a5cdb58bc74600a40a69c065263f8": "Gemini 2",
  "0x5f65f7b609678448494de4c87521cdf6cef1e932": "Gemini 3",
  "0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea": "Gemini 4",
  "0x07ee55aa48bb72dcc6e9d78256648910de513eca": "Gemini 6",
  "0x69a722f0b5da3af02b4a205d6f0c285f4ed8f396": "Gemini: Treasury",
  "0x6dee5b8a6080ba8595823a81c1fa8268dbeb6e6e": "HTX 1",
  "0x3f67fbd3b3dcda575c99fd9d7f8eee7f65ddd2c5": "HTX 11",
  "0x6bb3e74a14c27f42ca8f0f49b84a68ce7fba97b3": "HTX 12",
  "0x18709e89bd403f470088abdacebe86cc60dda12e": "HTX 17",
  "0xeee28d484628d41a82d01e21d12e2e78d69920da": "HTX 19",
  "0x5c985e89dde482efe97ea9f1950ad149eb73829b": "HTX 2",
  "0x8458d484572781415b22bfdbfeb57da5ae3b22fc": "HTX 21",
  "0x18916e1a2933cb349145a280473a5de8eb6630cb": "HTX 22",
  "0x6748f50f686bfbca6fe8ad62b22228b87f31ff2b": "HTX 24",
  "0xab5c66752a9e8167967685f1450532fb96d5d24f": "HTX 25",
  "0x3c11c3025ce387d76c2eddf1493ec55a8cc2a0a8": "HTX 26",
  "0xa8660c8ffd6d578f657b72c0c811284aef0b735e": "HTX 27",
  "0xbddf00563c9abd25b576017f08c46982012f12be": "HTX 30",
  "0xe93381fb4c4f14bda253907b18fad305d799241a": "HTX 34",
  "0xfdb16996831753d5331ff813c29a93c76834a0ad": "HTX 3",
  "0x0a98fb70939162725ae66e626fe4b52cff62c2e5": "HTX 5",
  "0x1062a747393198f70f71ec65a582423dba7e5ab3": "HTX 6",
  "0x5401dbf7da53e1c9dbf484e3d69505815f2f5e6e": "HTX 7",
  "0x90b5a8e8a84a5cf2cc82ad5f7c25f8c35c0bf0d4": "HTX: Deposit",
  "0xab64b6ae606a7fce2f85d4f37f5bea7c52e22d94": "Hashkey Cap: Deployer",
  "0xfbde1d44c4a18fd6ebf6dbf6c9e3c6e0ad89ffa6": "Hashkey Group 1",
  "0xcb3d85ffb1c07e6e676c9fdcecee4aa6a7b2d66d": "Hashkey Group 2",
  "0x5ca3a36d6bbed8b7176fc6e7d0f07c70a9e7a9be": "Hashkey Group 4",
  "0x75e89d5979e4f6fba9f97c104c2f0afb3f1dcb88": "MEXC 1",
  "0x0211f3cedbef3143223d3acf0e589747933e8527": "MEXC 2",
  "0x3cc936b795a188f0e246cbb2d74c5bd190aecf18": "MEXC 3",
  "0xee136c0389733849dd710ac7104e92c6bf497574": "MEXC 4",
  "0x9642b23ed1e01df1092b92641051881a322f5d4e": "MEXC 16",
  "0xd67f25ef2399a0c769b1a35634c5ce77166714db": "MEXC 20",
  "0xf95334a86d09a6eec74d69da344efaca424b13a9": "MEXC 24",
  "0x0003b5aa5e30e97fcc596bb5d0f3a75255e08d4e": "OKX 155",
  "0x9c22a4039f269e72de6b029b273be059cdbb831c": "OKX 221",
  "0x85dcd76d4fbd3aa0c85c27b9441222c19a14134b": "OKX 226",
  "0x2c8fbb630289363ac80705a1a61273f76fd5a161": "OKX 4",
  "0x98ec059dc3adfbdd63429454aeb0c990fba4a128": "OKX 6",
  "0x539c92186f7c6cc4cbf443f26ef84c595babbca1": "OKX 73",
  "0x868dab0b8e21ec0a48b726a1ccf25826c78c6d7f": "OKX 76",
  "0xdc3ce895714844b4775b6d06f0dae513542cee10": "OKX 77",
  "0xbfbbfaccd1126a11b8f84c60b09859f80f3bd10f": "OKX 93",
  "0xa9ac43f5b5e38155a288d1a01d2cbc4478e14573": "OKX: Hot Wallet 3",
  "0x2b5634c42055806a59e9107ed44d43c426e58258": "KuCoin 1",
  "0x689c56aef474df92d44a1b70850f808488f9769c": "KuCoin 2",
  "0xa1d8d972560c2f8144af871db508f0b0b10a3fbf": "KuCoin 3",
  "0xd6216fc19db775df9774a6e33526131da7d19a2c": "KuCoin 4",
  "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b91": "KuCoin 5",
  "0x738cf6903e6c4e699d1c2dd9ab8b67fcdb3121ea": "KuCoin 6",
  "0x236f9f97e0e62388479bf9e5ba4889e46b0273c3": "KuCoin 8",
  "0x88ff79eb2bc5850f27315415da8685282c7610f9": "KuCoin: Deposit Wallet",
  "0x6cc5f688a315f3dc28a7781717a9a798a59fda7b": "Kraken 13",
  "0xe853c56864a2ebe4576a807d26fdc4a0ada51919": "Kraken 3",
  "0x2910543af39aba0cd09dbb2d50200b3e800a63d2": "Kraken 4",
  "0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13": "Kraken 5",
  "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf": "Kraken 6",
  "0xa83b11093c858c86321fbc4c20fe82cdbd58e09e": "Kraken: Hot Wallet 1",
  "0xd2dd7b597fd2435b6db61ddf48544fd931e6869f": "Kraken 246",
  "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0": "Kraken 4",
  "0x8d05d9924fe935bd533a844271a1b2078eae6fcf": "Kraken: Cold Wallet 3",
  "0x9f1799fb47b1514f453bcebbc37ecfe883756e83": "Kraken: Cold Wallet 4",
  "0xf30ba13e4b04ce5dc4d254ae5fa95477800f0eb0": "Kraken: Hot Wallet 2",
  "0xcc282e2004428939ee5149a9e7872f0b4d5d5ec7": "Kraken: Hot Wallet 3",
  "0x38f6d5fb32f970fe60924b282704899411126336": "CoinEx 46",
  "0x548054687ef6c56c6d82e8269e5fd93d8b88fcb2": "CoinEx 48",
  "0x19184ab45c40c2920b0e0e31413b9434abd243ed": "CoinSpot 13",
  "0x33a64dcdfa041befebc9161a3e0c6180cd94fa89": "CoinSpot 16",
  "0xe978d95b437d75826aba2ed1a0bdb534f173e28c": "GMO Coin 10",
  "0x86e284421664840cb65c5b918da59c01ed8fa666": "GMO Coin 3",
  "0x29065a4c1f2f20d1e263930088890d6f49fe715a": "Poloniex 10",
  "0x841ed663f2636863d40be4ee76243377dff13a34": "Robinhood 5",
  "0x73af3bcf944a6559933396c1577b257e2054d935": "Robinhood 6",
  "0x40b38765696e3d5d8d9d834d8aad4bb6e418e489": "Robinhood",
  "0x0e58e8993100f1cbe45376c410f97f4893d9bfcd": "Upbit 41",
  "0x377b8ce04761754e8ac153b47805a9cf6b190873": "Upbit 59",
  "0x1c727a55ea3c11b0ab7d3a361fe0f3c47ce6de5d": "Uphold",
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "Wrapped Ether",
  "0xf5bec430576ff1b82e44ddb5a1c93f6f9d0884f3": "Yobit",
  "0xfd6724b4b3e8eca764f0dd07ccd903ad348d70f8": "ZB.com 3",
  "0x111cff45948819988857bbf1966a0399e0d1141e": "bitFlyer",
  "0x77fb357f55bef5a70d30663955f8c9f35794df0e": "eToro 4",
  "0x434587332cc35d33db75b93f4f27cc496c67a4db": "eToro 5",
  // Wintermute & Market Makers
  "0x0000006daea1723962647b7e189d311d757fb793": "Wintermute 1",
  "0x4f3a120e72c76c22ae802d129f599bfdbc31cb81": "Wintermute 2",
  "0xdbf5e9c5206d0db70a90108bf936da60221dc080": "Wintermute 3",
  "0x6c5c4c2f8f8d9b7c1e8d8b8e8f8g8h8i8j8k8l8": "Jump Trading 1",
  // Layer 2 Bridges
  "0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f": "Arbitrum: Inbox",
  "0xa3a7b6f88361f48403514059f1f16c8e78d60eec": "Arbitrum: Outbox Entry",
  "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1": "Optimism: Gateway",
  "0x25ace71c97b33cc4729cf772ae268934f7ab5fa1": "Optimism: L1CrossDomainMessenger",
  "0x5a7749f83b81b301cab5f48eb8516b986daef23d": "Optimism: L1StandardBridge Proxy",
  "0x3154cf16ccdb4c6d922629664174b904d80f2c35": "Base: L1StandardBridge",
  "0x3e2ea9b92b7e48a52296fd261dc26fd995284631": "zkSync Era: Diamond Proxy",
  "0x32400084c286cf3e17e7b677ea9583e60a000324": "zkSync: Diamond Proxy",
  "0x57891966931eb4bb6fb81430e6ce0a03aabde063": "zkSync: L1SharedBridge Proxy",
  "0xd19d4b5d358258f05d7b411e21a1460d11b0876f": "Linea: Bridge",
  "0x051f1d88f0af5763fb888ec4378b4d8b29ea3319": "Scroll: Bridge",
  // Burn Addresses
  "0x0000000000000000000000000000000000000000": "Null Address",
  "0x000000000000000000000000000000000000dead": "Burn Address",
  "0xdead000000000000000042069420694206942069": "Burn Address",
  // Top 500 Whales (Unknown aber erkannt)
  "0xca8fa8f0b631ecdb18cda619c4fc9d197c8affca": "Unknown Top 500 Whale #1", 
  "0x1b3cb81e51011b549d78bf720b0d924ac763a7c2": "Unknown Top 500 Whale #2",
  "0x2f2d854c1d6d5bb8936bb85bc07c28ebb42c9b10": "Unknown Top 500 Whale #3",
  "0xf929f0beff21c97cceb6f81a35f03b4efbdde24c": "Unknown Top 500 Whale #4",
  "0x8039797fc10604a00ae3e36dd7102f88591af220": "Unknown Top 500 Whale #5",
  "0x35d40e9e5a0b75d18dd5b1cd41b8b8e3c81cee93": "Unknown Top 500 Whale #6",
  "0x220866b1a2219f40e72f5c628b65d54268ca3a9d": "Unknown Top 500 Whale #7",
  "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41": "Unknown Top 500 Whale #8",
  "0x0000000000007f150bd6f54c40a34d7c3d5e9f56": "Unknown Top 500 Whale #9",
  "0xb0c66c52fd013d87dc8f38c18fe0d32c3e4a7a4a": "Unknown Top 500 Whale #10",
};

// ========================================
// SOLANA KNOWN WALLETS
// ========================================

// Solana Programs (System & DeFi)
export const SOLANA_PROGRAMS: { [key: string]: string } = {
  "11111111111111111111111111111111": "System Program",
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "Token Program",
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb": "Token 2022 Program",
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL": "Associated Token Account Program",
  "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo": "Memo Program",
  "SysvarRent111111111111111111111111111111111": "Rent Program",
  "SysvarC1ock11111111111111111111111111111111": "Clock Program",
  "Stake11111111111111111111111111111111111111": "Stake Program",
  "TokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL": "Associated Token Program",
  "Vote111111111111111111111111111111111111111": "Vote Program",
  "AddressMap111111111111111111111111111111111": "Address Map Program",
  "KeccakSecp256k11111111111111111111111111111": "Secp256k1 Program",
  "Feat1YXHhH6t1juaWF74WLcfv4XoNocjXA6sPWHNgAse": "Feature Proposal Program",
  "namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX": "Name Service Program",
  "LendZqTs7gn5CTSJU1jWKhKuVpjJGom45nnwPb2AMTi": "Lending Program",
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr": "Memo Program v2",
  "SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8": "Swap Program",
};

// Solana DEX Programs
export const SOLANA_DEX_PROGRAMS: { [key: string]: string } = {
  "4ckmDgGdxQoPDLUkDT3vHgSAkzA3QRdNq5ywwY4sUSJn": "Serum DEX V1",
  "BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg": "Serum DEX V1",
  "EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o": "Serum DEX V2",
  "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin": "Serum DEX V3",
  "RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr": "Raydium Liquidity Pool V2",
  "27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv": "Raydium Liquidity Pool V3",
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8": "Raydium Liquidity Pool V4",
  "5quBtoiQqxF9Jv6KYKctB59NT3gtJD2Y65kdnB1Uev3h": "Raydium Liquidity Pool AMM",
  "routeUGWgWzqBWFcrCfv8tritsqukccJPu3q5GPP3xS": "Raydium AMM Routing",
  "FarmqiPv5eAj3j1GMdMCMUGXqPUvmquZtMy86QH6rzhG": "Raydium Ecosystem Farm",
  "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1": "Raydium Authority V4",
  "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK": "Raydium Concentrated Liquidity",
  "EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q": "Raydium Stake",
  "CBuCnLe26faBpcBP2fktp4rp8abpcAnTWft6ZrP5Q4T": "Raydium Stake V4",
  "9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z": "Raydium Stake V5",
  "9HzJyW1qZsEiSfMUf6L2jo3CcTKAyBmSyKdwQeYisHrC": "Raydium IDO",
  "CPK8fQYShAmERZmysQRAGWPvV5qs3AvazQsiR9ctC6ED": "Raydium CLAMM LP",
  "82yxjeMsvaURa4MbZZ7WZZHfobirZYkH1zF8fmeGtyaQ": "Orca Aquafarm",
  "DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1": "Orca Token Swap",
  "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP": "Orca Token Swap V2",
  "JUP6i4ozu5ydDCnLiMogSckDPpbtr7BJ4FtzYWkb5Rk": "Jupiter Aggregator v1",
  "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo": "Jupiter Aggregator v2",
  "JUP3c2Uh3WA4Ng34tw6kPd2G4C5BB21Xo36Je1s32Ph": "Jupiter Aggregator v3",
  "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB": "Jupiter Aggregator v4",
  "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4": "Jupiter Aggregator v6",
  "PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu": "Jupiter Labs Perpetuals",
  "DF6c7dTBdZ9cb59pywKAVwy5NMSXiSfmXzYNwYFPNz9F": "OpenOcean",
  "DSwpgjMvXhtGn6BsbqmacdBZyfLj6jSWf3HJpdJtmg6N": "Dexlab Swap",
  "6FJon3QE27qgPVggARueB22hLvoh22VzJpXv4rBEoSLF": "IDO Program",
};

// Solana DeFi Protocols
export const SOLANA_DEFI: { [key: string]: string } = {
  "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD": "Marinade Finance",
  "MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA": "marginfi V2",
  "MR2LqxoSbw831bNy68utpu5n4YqBH3AzDmddkgk9LQv": "Marinade Staking",
  "ex9CfkBZZd6Nv9XdnoDmmB45ymbu4arXVk7g5pWnt3N": "Marinade Native 1",
  "stWirqFCf2Uts1JBL1Jsd3r6VBWhgnpdPxCTe1MFjrq": "Marinade Native 2",
  "MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky": "Mercurial Stable Swap",
  "SWABtvDnJwWwAb9CbSA3nv7nTnrtYjrACAVtuP3gyBB": "Mercurial PAI 3-Pool",
  "USD6kaowtDjwRkN5gAjw1PDMQvc9xRp8xW9GK8Z5HBA": "Mercurial UST 3-Pool",
  "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo": "Solend Protocol",
  "HajXYaDXmohtq2ZxZ6QVNEpqNn1T53Zc9FnR1CnaNnUf": "Parrot Finance",
  "7vxeyaXGLqcp66fFShqUdHxdacp4k4kwUpRSSeoZLCZ4": "Solfarm Vault",
  "Crt7UoUR6QgrFrN7j8rmSQpUTNWNSitSwWvsWGf1qZ5t": "Saber Router",
  "SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ": "Saber Stable Swap",
  "JD3bq9hGdy38PuWQ4h2YJpELmHVGPPfFSuFkpzAd9zfu": "Mango Markets V1",
  "5fNfvyp5czQVX77yoACa3JJVEhdRaWjPuazuWgjhTqEH": "Mango Markets V2",
  "mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68": "Mango Markets V3",
  "4MangoMjqJ2firMokCjjGgoK8d4MXcrgL7XJaL3w6fVg": "Mango Markets V4",
  "7sPptkymzvayoSbLXzBsXEF8TSf3typNnAWkrKrDizNb": "Mango ICO",
  "GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J": "Mango Governance",
  "CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi": "Lido for Solana",
  "SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1": "Step Finance Swap",
  "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy": "Stake Pool",
  "BrEAK7zGZ6dM71zUDACDqJnekihmwF15noTddWTsknjC": "Break Solana",
  "PrtedjXEcbH2SCgvL1oA1rFGxAr2UgZvqxQGxN2ErDT": "Port Finance Canary",
  "Port7uDYB3wk6GJAw4KT1WpTeMtSu9bTcChBHkX2LfR": "Port Finance v1.0",
  "22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD": "Serum Swap",
};

// Solana NFT & Metaplex
export const SOLANA_NFT: { [key: string]: string } = {
  "cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ": "Metaplex NFT Candy Machine v1",
  "cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ": "Metaplex NFT Candy Machine v2",
  "CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR": "Candy Machine Core",
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s": "Metaplex Token Metadata",
  "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn": "Metaplex Token Vault",
  "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98": "Metaplex Program",
  "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8": "Metaplex NFT Auction",
  "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY": "Bubblegum",
  "617jbWo616ggkDxvW1Le8pV38XLbVSyWY8ae6QUmGBAU": "Solsea NFT Marketplace",
  "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz": "Solanart NFT Marketplace",
  "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7": "DigitalEyes NFT Marketplace",
  "7t8zVJtPCFAqog1DcnB6Ku1AVKtWfHkCiPi1cAvcJyVF": "DigitalEyes Direct Sell",
  "MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8": "Magic Eden NFT Marketplace",
  "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K": "Magic Eden V2",
  "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix": "Magic Eden V2 Authority",
};

// Solana Oracle Programs
export const SOLANA_ORACLES: { [key: string]: string } = {
  "FsJ3A3u2vn5cTVofAjvy6y5kwABJAqYWpe4975bi2epH": "Pyth Oracle",
  "pytS9TjG1qyAZypk7n8rw8gfW9sUaqqYyMhJQ4E7JCQ": "Pyth Staking",
  "DtmE9D2CSB4L5D6A15mraeEjrGMm6auWVzgaD8hK2tZM": "Switchboard Oracle",
};

// Solana Bridge Programs
export const SOLANA_BRIDGES: { [key: string]: string } = {
  "WormT3McKhFJ2RkiGpdw9GKvNCrB2aB54gb2uV9MfQC": "Wormhole",
  "wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb": "Wormhole Token Bridge",
  "worm2ZoG2kUd4vFXhvjh93UUH596ayRfgQ2MgjNMTth": "Wormhole Core",
  "WnFt12ZrnzZrFZkt2xsNsaNWoQribnuQ5B5FrDbwDhD": "Wormhole NFT Bridge",
};

// Solana Bonfida & Name Service
export const SOLANA_BONFIDA: { [key: string]: string } = {
  "jCebN34bUfdeUYJT13J1yG16XWQpt5PDx6Mse9GUqhR": "Bonfida Name Service",
  "nftD3vbNkNqfj2Sd3HZwbpw4BxxKWr4AjGb9X38JeZk": "Bonfida Name Tokenizer",
  "AVWV7vdWbLqXiLKFaP19GhYurhwxaLp2qRBSjT5tR5vT": "Bonfida Auction",
  "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx": "Bonfida Root Domain Account",
  "33m47vH6Eav6jr5Ry86XjhRft2jRBLDnDgPSHoquXi2Z": "Bonfida Reverse Lookup Class",
  "FvPH7PrVrLGKPfqaf3xJodFTjZriqrAXXLTVWEorTFBi": "Bonfida Twitter Verification Authority",
  "4YcexoW3r78zz16J2aqmukBLRwGq6rAvWzJpkYAXqebv": "Bonfida Twitter Root Parent Registry Key",
};

// Solana CEX Wallets
export const SOLANA_CEX: { [key: string]: string } = {
  "2ojv9BAiHUrvsm9gxDe7fJSzbNZSJcxZvf8dqmWGHG8S": "Binance 1",
  "5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9": "Binance 2",
  "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM": "Binance 3",
  "6ZRCB7AAqGre6c72PRz3MHLC73VMYvJ8bi9KHf1HFpNk": "FTX",
  "5Xm6nU1Bi6UewCrhJQFk1CAV97ZJaRiFw4tFNhUbXy3u": "Alameda 1",
  "HtJAWMsSRXbyBvXm1F4PDnGFzhgfBAPciyHWMZgugejX": "Alameda 2",
  "CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq": "Alameda 3",
  "H8sMJSCQxfKiFTCfDR3DUMLPwcRbM61LGFJ8N4dK3WjS": "Coinbase 1",
  "2AQdpHJ2JpcEgPiATUXjQxA8QmafFegfQwSLWSprPicm": "Coinbase 2",
  "6iVBAsquJRaLsXbojb18kqTW1d5iVLspVjCtsReZBKhY": "Ascendex",
  "ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ": "MEXC",
  "57vSaRTqN9iXaemgh4AoDsZ63mcaoshfMK8NP3Z5QNbs": "Kucoin",
  "FxteHmLwG9nk1eL4pjNve3Eub2goGkkz6g6TbvdmW46a": "Bitfinex",
  "u6PJ8DtQuPFnfmwHbGFULQ4u4EgjDiyYKjVEsynXq2w": "Gate.io",
  "JBpj7yp4Afvb71TmanVwJZXGeX4kqbGFvjCFCRo3EbTM": "FTX.US",
  "AhFjTUE2DgNFnAfRtFLUmLTLYyhxzz7j1cvKbvP18tg9": "Jump Crypto",
  "88xTWZMeKfiTgbfEmPLdsUCQcZinwUfk25EBQZ21XMAZ": "Huobi",
  "5VCwKtCXgCJ6kit5FybXjvriW3xELsFDhYrPSqtJNmcD": "OKX",
  "AC5RDfQFmDS1deWZos921JfqscXdByf8BKHs5ACWjtW2": "Bybit",
  "FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5": "Kraken",
  "6b4aypBhH337qSzzkbeoHWzTLt4DjG2aG8GkrrTQJfQA": "FTX Cold Storage #1",
  "9uyDy9VDBw4K7xoSkhmCAm8NAFCwu4pkF6JeHUCtVKcX": "FTX Cold Storage #2",
  "6wEMcwrcF5AP9jpHWQcPxHXciWA2g217Qq81CTWjbgBw": "FTX Cold Storage #3",
  "EhYXq3ANp5nAerUpbSgd7VK2RRcxK1zNuSQ755G5Mtxx": "Alameda Staking #1",
  "e6keeZrGmHMiQaFM3TAYvFz8HE3qtTFUSHsyqq5FEw7": "Alameda Staking #2",
  "DYG1ooTxkLS5iHDkte2XK4QBrpHziDR6EEZg5VsqNpVo": "Alameda Staking #3",
  "7yZXxvbNBBqVR9N8a3uceW6AhowNZas2Ff1D4KKQtKFy": "ZachXBT Donation",
  "AobVSwdW9BbpMdJvTqeCN4hPAmh4rHm7vwLnQ5ATSyrS": "Crypto.com 2",
  "6FEVkH17P9y8Q9aCkDdPcMDjvj7SVxrTETaYEm8f51Jy": "Crypto.com 1",
  "BmFdpraQhkiDQE6SnfG5omcA1VwzqfXrwtNYBwWTymy6": "Kucoin",
  "HiRpdAZifEsZGdzQ5Xo5wcnaH3D2Jj9SoNsUzcYNK78J": "Gate.io 2",
  "GJRs4FwHtemZ5ZE9x3FNvJ8TMwitKTh21yxdRPqn7npE": "Coinbase 2",
  "41zCUJsKk6cMB94DDtm99qWmyMZfp4GkAhhuz4xTwePu": "Circle Treasury",
  "HLksszpjGgiRbyumXyQe5VpmJLuJEnf6YcRzghyDc8Fo": "Jito Treasury #2",
  "43DbAvKxhXh1oSxkJSqGosNw3HpBnmsWiak6tB5wpecN": "Backpack Exchange",
  "2p6FY2frHSMX6TUYoLq6tFfAh1Q2ESn9HDzWDKFUQwDi": "Backpack Earthquake Aid",
  "3qjdFdFKxJpUsJzmsQSpS6JoEUtQjLMEps9YLP8PdPcy": "SMC DAO: SMC Mega Wallet",
  "7SRyi7urg28j1XtioKbcJLtkL9Pqu39Y4CTAXwmu2Hts": "Coinlist",
};

// Solana Hacker Wallets
export const SOLANA_HACKERS: { [key: string]: string } = {
  "Htp9MGP8Tig923ZFY7Qf2zzbMUmYneFRAhSp7vSg4wxV": "Hacker's wallet 1",
  "CEzN7mqP9xoxn2HdyW6fjEJ73t7qaX9Rp2zyS6hb3iEu": "Hacker's wallet 2",
  "5WwBYgQG6BdErM2nNNyUmQXfcUnB68b6kesxBywh1J3n": "Hacker's wallet 3",
  "GeEccGJ9BEzVbVor1njkBCCiqXJbXVeDHaXDCrBDbmuy": "Hacker's wallet 4",
  "gYs5v8LBaTNRFhU8rSSFeEqaCQPjmkT28naAN711111": "Rainbow Drainer",
  "Esmx2QjmDZMjJ15yBJ2nhqisjEt7Gqro4jSkofdoVsvY": "Hacker (Crema Finance Exploit)",
  "76w4SBe2of2wWUsx2FjkkwD29rRznfvEkBa1upSbTAWH": "Hacker (Nirvana Finance Exploit)",
  "yUJw9a2PyoqKkH47i4yEGf4WXomSHMiK7Lp29Xs2NqM": "Mango Markets Exploiter",
  "61wJT43nWMUpDR92wC7pmo6xoJRh2s4kCYRBq4d5XQHZ": "Solend Exploiter",
  "AgJddDJLt17nHyXDCpyGELxwsZZQPqfUsuwzoiqVGJwD": "Raydium LP Exploiter",
  "EAUwikTgqeHKJMaqDj17Cwb6TH3XzcXbxHSN7etgzMFt": "Wormhole Exploiter",
  "9WArrPQyZ4HovjoUjYbvtJtbrfJNzQWCBk5k75w6NpEb": "Hadeswap Exploiter",
  "35wiSXzUDkN6vbxoNT7ARVVQduVRbSP4kVQnXbAcvhnM": "TurtleNFT Exploiter",
  "5B62qV4fmUqynvxJVQYuZHr6nTP8c3umFmzLjiJg5aa1": "Robox.fi Exploiter 1",
  "YSjzzLaTJiPDRBoc9KJ16Jfgz4EFtV9EE3xDYCUxhWb": "Saga Tool Exploiter",
  "8iZYbAhpEYmp6whb4pCWnNhQYr32dg4R62Z9sVhsBg6w": "Presale Scammer #1",
  "9FFujzVqCgUC69x5rKwc47hQwjQZ1T4spuRP6tWHgpn4": "Pundu Presale Scammer",
  "8Dga8pKG22APohrgkUpxXHawkMJT7Vj5cUquuEjHTE5i": "Side Presale Scammer",
  "DCQATk3kKtf2cVns52eYMK5jopyNrUgVBNTaodGSZ6pp": "Bridge Exploiter #1",
  "2iLuEtoyaCM1Pin7PSMeKGnjFCVtcm3yyosB3gf4op8i": "Bridge Exploiter #2",
  "FQvjem54YLLU5AdP5wz78vDQrUpFaJNuAk5AdpRiEfjr": "Trezor Compromise Wallet",
  "2BPvvKxu2KvpQU82B1xoe8rHxsbRXCpV9jQYtrNUtkH9": "Gotbit Exploiter",
  "BUYgBfavHoGbfGYseyTWpzqKNeeYFjoJsgxiQcH4in4v": "Ansem Impersonator",
  "Ew12E9WjFTv7HPoJnzJzFQJJzAEtQkStYsQrbXkPRkgu": "Robox.fi Exploiter 2",
};

// Solana Trust Tokens
export const SOLANA_TRUST_TOKENS: { [key: string]: string } = {
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
  "So11111111111111111111111111111111111111112": "SOL",
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "USDT",
};

// Combined Solana Known Wallets
export const KNOWN_WALLETS_SOL: { [key: string]: string } = {
  ...SOLANA_PROGRAMS,
  ...SOLANA_DEX_PROGRAMS,
  ...SOLANA_DEFI,
  ...SOLANA_NFT,
  ...SOLANA_ORACLES,
  ...SOLANA_BRIDGES,
  ...SOLANA_BONFIDA,
  ...SOLANA_CEX,
  ...SOLANA_HACKERS,
  ...SOLANA_TRUST_TOKENS,
};

// ========================================
// COMBINED KNOWN WALLETS (LEGACY EXPORT)
// ========================================
export const KNOWN_WALLETS: { [key: string]: string } = {
  ...KNOWN_WALLETS_EVM,
};

// ========================================
// HELPER FUNCTIONS FÜR WALLET ERKENNUNG
// ========================================

/**
 * Prüft ob eine Adresse ein bekanntes Label hat (Multi-Chain)
 */
export function getKnownWalletLabel(address: string, network?: string): string | null {
  if (!address) return null;
  
  const isSolana = network === 'solana' || (!address.startsWith('0x') && address.length > 30);
  
  if (isSolana) {
    return KNOWN_WALLETS_SOL[address] || null;
  } else {
    const addrLower = address.toLowerCase();
    return KNOWN_WALLETS_EVM[addrLower] || null;
  }
}

/**
 * Prüft ob eine Adresse ein CEX ist (via Label oder Keyword)
 */
export function isCEXWallet(labelOrAddress: string, network?: string): boolean {
  if (!labelOrAddress) return false;
  
  // If it looks like an address, get the label first
  let label = labelOrAddress;
  if (labelOrAddress.length > 20 && (labelOrAddress.startsWith('0x') || !labelOrAddress.includes(' '))) {
    label = getKnownWalletLabel(labelOrAddress, network) || '';
  }
  
  return CEX_KEYWORDS.some(keyword => 
    label.toLowerCase().includes(keyword.toLowerCase())
  );
}

/**
 * Prüft ob eine Adresse ein Deposit Wallet ist
 */
export function isDepositWallet(labelOrAddress: string, network?: string): boolean {
  if (!labelOrAddress) return false;
  
  let label = labelOrAddress;
  if (labelOrAddress.length > 20 && (labelOrAddress.startsWith('0x') || !labelOrAddress.includes(' '))) {
    label = getKnownWalletLabel(labelOrAddress, network) || '';
  }
  
  return DEPOSIT_PATTERNS.some(pattern => 
    label.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Prüft ob eine Adresse ein LP Pool ist
 */
export function isLPPool(labelOrAddress: string, network?: string): boolean {
  if (!labelOrAddress) return false;
  
  let label = labelOrAddress;
  if (labelOrAddress.length > 20 && (labelOrAddress.startsWith('0x') || !labelOrAddress.includes(' '))) {
    label = getKnownWalletLabel(labelOrAddress, network) || '';
  }
  
  return LP_PATTERNS.some(pattern => 
    label.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Prüft ob eine Adresse eine Bridge ist
 */
export function isBridge(labelOrAddress: string, network?: string): boolean {
  if (!labelOrAddress) return false;
  
  let label = labelOrAddress;
  if (labelOrAddress.length > 20 && (labelOrAddress.startsWith('0x') || !labelOrAddress.includes(' '))) {
    label = getKnownWalletLabel(labelOrAddress, network) || '';
  }
  
  return BRIDGE_PATTERNS.some(pattern => 
    label.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Prüft ob eine Adresse ein Hacker/Scammer ist
 */
export function isHackerWallet(labelOrAddress: string, network?: string): boolean {
  if (!labelOrAddress) return false;
  
  let label = labelOrAddress;
  if (labelOrAddress.length > 20 && (labelOrAddress.startsWith('0x') || !labelOrAddress.includes(' '))) {
    label = getKnownWalletLabel(labelOrAddress, network) || '';
  }
  
  return HACKER_PATTERNS.some(pattern => 
    label.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Prüft ob Adresse Null/Burn ist (Multi-Chain)
 */
export function isNullAddress(address: string): boolean {
  if (!address) return false;
  const normalized = address.toLowerCase();
  return [...NULL_ADDRESSES_EVM, ...NULL_ADDRESSES_SOL].some(
    null_addr => normalized === null_addr.toLowerCase()
  );
}

/**
 * Prüft ob eine Adresse ein Solana Program ist
 */
export function isSolanaProgram(address: string): boolean {
  return !!SOLANA_PROGRAMS[address] || !!SOLANA_DEX_PROGRAMS[address];
}

/**
 * Kategorisiert eine Wallet-Adresse (Multi-Chain)
 */
export function categorizeWallet(address: string, label?: string, network?: string): {
  type: 'cex' | 'deposit' | 'lp' | 'bridge' | 'whale' | 'burn' | 'contract' | 'program' | 'hacker' | 'unknown';
  label: string;
  icon: string;
  isRisky: boolean;
} {
  const isSolana = network === 'solana' || (!address.startsWith('0x') && address.length > 30);
  const walletLabel = label || getKnownWalletLabel(address, network);
  
  if (isNullAddress(address)) {
    return { type: 'burn', label: 'Burn Address', icon: '🔥', isRisky: false };
  }
  
  if (isSolana && isSolanaProgram(address)) {
    return { type: 'program', label: walletLabel || 'Solana Program', icon: '⚙️', isRisky: false };
  }
  
  if (!walletLabel) {
    const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return { type: 'unknown', label: `Wallet ${shortAddr}`, icon: '👤', isRisky: false };
  }
  
  if (isHackerWallet(walletLabel)) {
    return { type: 'hacker', label: walletLabel, icon: '⚠️', isRisky: true };
  }
  
  if (isCEXWallet(walletLabel)) {
    return { type: 'cex', label: walletLabel, icon: '🏛️', isRisky: false };
  }
  
  if (isDepositWallet(walletLabel)) {
    return { type: 'deposit', label: walletLabel, icon: '📥', isRisky: false };
  }
  
  if (isLPPool(walletLabel)) {
    return { type: 'lp', label: walletLabel, icon: '💧', isRisky: false };
  }
  
  if (isBridge(walletLabel)) {
    return { type: 'bridge', label: walletLabel, icon: '🌉', isRisky: false };
  }
  
  // Check if it's a known whale
  if (walletLabel.includes('Whale')) {
    return { type: 'whale', label: walletLabel, icon: '🐋', isRisky: false };
  }
  
  return { type: 'contract', label: walletLabel, icon: '📜', isRisky: false };
}

/**
 * Holt alle CEX Adressen für ein Network
 */
export function getCEXAddresses(network?: string): string[] {
  const isSolana = network === 'solana';
  
  if (isSolana) {
    return Object.keys(SOLANA_CEX);
  } else {
    return Object.entries(KNOWN_WALLETS_EVM)
      .filter(([_, label]) => isCEXWallet(label))
      .map(([addr, _]) => addr);
  }
}

/**
 * Holt alle Hacker Adressen für ein Network
 */
export function getHackerAddresses(network?: string): string[] {
  const isSolana = network === 'solana';
  
  if (isSolana) {
    return Object.keys(SOLANA_HACKERS);
  } else {
    return Object.entries(KNOWN_WALLETS_EVM)
      .filter(([_, label]) => isHackerWallet(label))
      .map(([addr, _]) => addr);
  }
}

/**
 * Debug: Gibt Statistiken über bekannte Wallets aus
 */
export function getKnownWalletStats(): {
  evmCount: number;
  solanaCount: number;
  solanaCexCount: number;
  solanaHackerCount: number;
  solanaProgramCount: number;
} {
  return {
    evmCount: Object.keys(KNOWN_WALLETS_EVM).length,
    solanaCount: Object.keys(KNOWN_WALLETS_SOL).length,
    solanaCexCount: Object.keys(SOLANA_CEX).length,
    solanaHackerCount: Object.keys(SOLANA_HACKERS).length,
    solanaProgramCount: Object.keys(SOLANA_PROGRAMS).length + Object.keys(SOLANA_DEX_PROGRAMS).length,
  };
}