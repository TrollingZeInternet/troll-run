import prisma from "@/lib/prisma";

export interface ScanLogData {
  address: string;
  network: string;
  symbol?: string;
  name?: string;
  score?: number;
  riskLevel?: string;
  source?: "web" | "telegram" | "api";
  chatId?: string;
  responseTime?: number;
  cached?: boolean;
  error?: string;
}

export async function logScan(data: ScanLogData): Promise<void> {
  try {
    await prisma.scanLog.create({
      data: {
        address: data.address.toLowerCase(),
        network: data.network.toLowerCase(),
        symbol: data.symbol?.slice(0, 50),
        name: data.name?.slice(0, 100),
        score: data.score,
        riskLevel: data.riskLevel,
        source: data.source || "web",
        chatId: data.chatId,
        responseTime: data.responseTime,
        cached: data.cached || false,
        error: data.error?.slice(0, 500),
      },
    });
  } catch (error) {
    console.error("[Analytics] Scan logging error:", error);
  }
}

export type MetricType =
  | "api_response"
  | "cache_hit"
  | "cache_miss"
  | "rate_limit"
  | "error";

export async function logMetric(
  metricType: MetricType,
  value: number,
  metadata?: Record<string, unknown>,
): Promise<void> {
  // SystemMetric is not in this project's schema yet — keep scan logs working.
  if (process.env.NODE_ENV === "development") {
    console.debug("[Analytics] metric", metricType, value, metadata);
  }
}
