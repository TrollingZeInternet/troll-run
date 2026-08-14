'use client';

/**
 * PremiumTeaser – Blur-Lock Overlay für Premium-Features
 */

import { ReactNode } from 'react';

interface PremiumTeaserProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function PremiumTeaser({ title, description, children }: PremiumTeaserProps) {
  return (
    <div className="ts-premium-lock ts-panel">
      <div className="ts-premium-lock__content ts-panel-body">
        {children ?? (
          <div className="ts-stack-lg">
            <div className="ts-skeleton ts-skeleton--h-md ts-skeleton-w-60" />
            <div className="ts-skeleton ts-skeleton--h-sm ts-skeleton-w-90" />
            <div className="ts-skeleton ts-skeleton--h-sm ts-skeleton-w-75" />
            <div className="ts-skeleton ts-skeleton--h-lg ts-skeleton-w-full" />
          </div>
        )}
      </div>

      <div className="ts-premium-lock__overlay">
        <span className="ts-premium-badge">🔒 Premium</span>
        <p className="ts-premium-title">{title}</p>
        <p className="ts-premium-desc">{description}</p>
        <button type="button" className="ts-btn-scan ts-btn-scan--compact" disabled>
          COMING SOON
        </button>
      </div>
    </div>
  );
}

export default PremiumTeaser;