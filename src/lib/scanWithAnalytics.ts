// lib/scanWithAnalytics.ts
// Wrapper für Scan-Funktionen mit automatischem Analytics Logging

import { logScan, logMetric, ScanLogData } from "@/lib/analytics";

// Generic ScanResult - accepts any scan result object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ScanResult = Record<string, any> | null;

/**
 * Logs a scan result to analytics
 * Call this after every successful or failed scan
 */
export async function logScanResult(
  address: string,
  network: string,
  result: ScanResult,
  options?: {
    source?: "web" | "telegram" | "api";
    chatId?: string;
    cached?: boolean;
    responseTime?: number;
    error?: string;
  }
): Promise<void> {
  const logData: ScanLogData = {
    address,
    network,
    symbol: result?.market?.symbol,
    name: result?.market?.name,
    score: result?.score,
    riskLevel: result?.riskLevel,
    source: options?.source || "web",
    chatId: options?.chatId,
    responseTime: options?.responseTime || result?.meta?.responseTime,
    cached: options?.cached || false,
    error: options?.error || result?.error,
  };

  // Log the scan
  await logScan(logData);

  // Log response time metric
  if (logData.responseTime) {
    await logMetric("api_response", logData.responseTime, {
      network,
      cached: logData.cached,
    });
  }

  // Log cache metric
  if (options?.cached) {
    await logMetric("cache_hit", 1, { network });
  } else {
    await logMetric("cache_miss", 1, { network });
  }

  // Log error metric if there was an error
  if (options?.error || result?.error) {
    await logMetric("error", 1, {
      network,
      errorType: options?.error || result?.error,
    });
  }
}

/**
 * Log a rate limit hit
 */
export async function logRateLimitHit(ip: string): Promise<void> {
  await logMetric("rate_limit", 1, { ip: ip.slice(0, 8) }); // Partial IP for privacy
}