// app/api/scan/route.ts - TROLLSCANNER V5.3 FREE API ENDPOINT
// MIT NETWORK NORMALIZER + ANALYTICS LOGGING

import { NextResponse } from 'next/server';
import { runFullScan, ScannerError } from './logic';
import { logScanResult, logRateLimitHit } from '@/lib/scanWithAnalytics';

// ========================================
// NETWORK NORMALIZER (WICHTIGER FIX)
// ========================================
function normalizeNetwork(input: string): string {
  const map: Record<string, string> = {
    'ethereum': 'eth',
    'Ethereum': 'eth',
    'ETH': 'eth',
    'bnb': 'bsc',
    'BNB': 'bsc',
    'binance': 'bsc',
    'binance smart chain': 'bsc',
    'bsc': 'bsc',
    // Weitere Aliasse bei Bedarf
  };

  const normalized = input.toLowerCase().trim();
  return map[normalized] || normalized;
}

// ========================================
// KONFIGURATION
// ========================================
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const RATE_LIMIT = parseInt(process.env.SCAN_RATE_LIMIT || '20', 10);
const RATE_LIMIT_WINDOW = parseInt(process.env.SCAN_RATE_LIMIT_WINDOW_MS || '60000', 10);

// ========================================
// IN-MEMORY CACHE & RATE LIMIT (Fallback)
// ========================================
const scanCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = parseInt(process.env.SCAN_CACHE_DURATION_MS || '60000', 10);
const MAX_CACHE_SIZE = 500;

const requestCounts = new Map<string, { count: number; resetTime: number }>();

// ========================================
// SUPPORTED NETWORKS (interne Keys)
// ========================================
const SUPPORTED_NETWORKS = [
  'eth', 'bsc', 'polygon', 'arbitrum', 'optimism', 'base',
  'avalanche', 'fantom', 'cronos', 'linea', 'scroll',
  'zksync', 'mantle', 'blast', 'solana'
];

// ========================================
// RATE LIMITING
// ========================================
async function getRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return getInMemoryRateLimit(ip);
  }

  const key = `ratelimit:scan:${ip}`;
  const windowSeconds = Math.ceil(RATE_LIMIT_WINDOW / 1000);

  try {
    const res = await fetch(`${UPSTASH_REDIS_REST_URL}/incr/${key}`, {
      headers: { 'Authorization': `Bearer ${UPSTASH_REDIS_REST_TOKEN}` }
    });

    if (!res.ok) return getInMemoryRateLimit(ip);

    const data = await res.json();
    const count = data.result as number;

    if (count === 1) {
      await fetch(`${UPSTASH_REDIS_REST_URL}/expire/${key}/${windowSeconds}`, {
        headers: { 'Authorization': `Bearer ${UPSTASH_REDIS_REST_TOKEN}` }
      });
    }

    return { 
      allowed: count <= RATE_LIMIT, 
      remaining: Math.max(0, RATE_LIMIT - count) 
    };
  } catch {
    return getInMemoryRateLimit(ip);
  }
}

function getInMemoryRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

// ========================================
// API ROUTE
// ========================================
export async function GET(request: Request) {
  const startTime = Date.now();

  const { searchParams } = new URL(request.url);
  
  // ←←← NETWORK NORMALISIERUNG (WICHTIG!)
  let network = normalizeNetwork(searchParams.get('network') || 'eth');
  const address = searchParams.get('address');

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 'unknown';

  // Rate Limit
  const rateLimit = await getRateLimit(ip);
  if (!rateLimit.allowed) {
    await logRateLimitHit(ip);
    return NextResponse.json(
      {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please wait before trying again.',
        retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
      },
      { status: 429 }
    );
  }

  if (!address) {
    return NextResponse.json({ error: 'NO_ADDRESS', message: 'Contract address is required' }, { status: 400 });
  }

  if (!SUPPORTED_NETWORKS.includes(network)) {
    return NextResponse.json({
      error: 'UNSUPPORTED_NETWORK',
      message: `Network "${network}" is not supported`,
      supportedNetworks: SUPPORTED_NETWORKS
    }, { status: 400 });
  }

  const normalizedAddress = address.trim();
  const cacheKey = `${normalizedAddress.toLowerCase()}-${network}`;

  // Cache Check
  const cached = scanCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    const responseTime = Date.now() - startTime;
    const cachedData = cached.data as any;

    await logScanResult(normalizedAddress, network, cachedData, {
      source: 'web',
      responseTime,
      cached: true,
    });

    return NextResponse.json({
      ...cachedData,
      meta: { ...cachedData.meta, cached: true, responseTime }
    });
  }

  try {
    const result = await runFullScan(normalizedAddress, network);

    // Cache aktualisieren
    scanCache.set(cacheKey, { data: result, timestamp: Date.now() });

    if (scanCache.size > MAX_CACHE_SIZE) {
      const oldest = Array.from(scanCache.keys())[0];
      scanCache.delete(oldest);
    }

    const responseTime = Date.now() - startTime;

    await logScanResult(normalizedAddress, network, result, {
      source: 'web',
      responseTime,
      cached: false,
    });

    return NextResponse.json({
      ...result,
      meta: { ...result.meta, responseTime }
    });

  } catch (error: unknown) {
    const responseTime = Date.now() - startTime;
    const message = error instanceof Error ? error.message : 'Unknown error';

    await logScanResult(normalizedAddress, network, null, {
      source: 'web',
      responseTime,
      cached: false,
      error: message,
    });

    if (error instanceof ScannerError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 });
  }
}