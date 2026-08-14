'use client';

/**
 * ============================================================================
 * ScannerError – Typisierte Error-Banner
 * Phase 1b: Zeigt API-Codes, Validation- und Network-Fehler einheitlich an
 * ============================================================================
 */

import { ScanError } from '@/lib/scanner/types';

interface ScannerErrorProps {
  error: ScanError | string;
}

/** Normalisiert string | ScanError zu ScanError */
function normalizeError(error: ScanError | string): ScanError {
  if (typeof error === 'string') {
    return { type: 'validation', message: error };
  }
  return error;
}

export function ScannerError({ error }: ScannerErrorProps) {
  const err = normalizeError(error);

  return (
    <div className="ts-error" role="alert">
      {err.type === 'api' && (
        <span className="ts-error-code">[{err.code}]</span>
      )}
      {err.type === 'network' && (
        <span className="ts-error-code">[NETWORK]</span>
      )}
      {err.type === 'validation' && (
        <span className="ts-error-code">[INPUT]</span>
      )}
      {err.message}
    </div>
  );
}

export default ScannerError;
