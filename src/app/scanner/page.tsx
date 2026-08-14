"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ScannerShell } from "./components/ScannerShell";
import { ScannerInput } from "./components/ScannerInput";
import { ScannerLoading } from "./components/ScannerLoading";
import { ScannerError } from "./components/ScannerError";
import { ScannerResults } from "./components/ScannerResults";
import { useScanner } from "@/lib/scanner/useScanner";

function ScannerPageContent() {
  const searchParams = useSearchParams();
  const useMock = searchParams.get("mock") === "1";

  const {
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
  } = useScanner({ useMock });

  return (
    <ScannerShell version="v5.2">
      {useMock && (
        <div className="ts-meta-badge ts-meta-badge--cached ts-mb ts-mock-banner">
          MOCK MODE — API bypassed
        </div>
      )}

      <ScannerInput
        address={address}
        network={network}
        loading={loading}
        onAddressChange={handleAddressChange}
        onNetworkChange={handleNetworkChange}
        onScan={handleScan}
      />

      {error && <ScannerError error={error} />}

      {loading && <ScannerLoading />}

      {result && !loading && (
        <ScannerResults
          result={result}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </ScannerShell>
  );
}

export default function ScannerPage() {
  return (
    <div className="pt-20">
      <Suspense
        fallback={
          <ScannerShell version="v5.2">
            <ScannerLoading />
          </ScannerShell>
        }
      >
        <ScannerPageContent />
      </Suspense>
    </div>
  );
}
