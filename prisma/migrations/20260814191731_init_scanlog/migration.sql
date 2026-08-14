-- CreateTable
CREATE TABLE "ScanLog" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "symbol" TEXT,
    "name" TEXT,
    "score" INTEGER,
    "riskLevel" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL DEFAULT 'web',
    "chatId" TEXT,
    "responseTime" INTEGER,
    "cached" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,

    CONSTRAINT "ScanLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScanLog_address_idx" ON "ScanLog"("address");

-- CreateIndex
CREATE INDEX "ScanLog_timestamp_idx" ON "ScanLog"("timestamp");

-- CreateIndex
CREATE INDEX "ScanLog_symbol_idx" ON "ScanLog"("symbol");

-- CreateIndex
CREATE INDEX "ScanLog_source_idx" ON "ScanLog"("source");

-- CreateIndex
CREATE INDEX "ScanLog_network_idx" ON "ScanLog"("network");

-- CreateIndex
CREATE INDEX "ScanLog_address_timestamp_idx" ON "ScanLog"("address", "timestamp");
