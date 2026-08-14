'use client';

/**
 * TabSocial – Premium Teaser für Social Intelligence
 */

import { PremiumTeaser } from '../PremiumTeaser';
import { TabPanel } from '../shared/ScannerUI';

const MOCK_SOCIAL_METRICS = [
  { label: 'X Mentions (24h)', value: '2,847', trend: '+340%' },
  { label: 'Telegram Members', value: '12.4K', trend: '+12%' },
  { label: 'Sentiment Score', value: '78/100', trend: 'Bullish' },
  { label: 'Influencer Alerts', value: '5', trend: '3 new' },
  { label: 'Bot Activity', value: 'Low', trend: 'Clean' },
  { label: 'FUD Index', value: '0.23', trend: 'Safe' },
];

export function TabSocial() {
  return (
    <TabPanel tabId="social">
      <PremiumTeaser
        title="Social Intelligence"
        description="Real-time X/Telegram sentiment, influencer tracking, bot detection and FUD alerts — unlock with Trove Premium."
      >
        <div className="ts-stack-lg">
          <div className="ts-social-grid">
            {MOCK_SOCIAL_METRICS.map((metric) => (
              <div key={metric.label} className="ts-panel ts-social-metric">
                <div className="ts-social-metric__label">{metric.label}</div>
                <div className="ts-social-metric__value">{metric.value}</div>
                <div className="ts-social-metric__trend">{metric.trend}</div>
              </div>
            ))}
          </div>

          <div className="ts-panel ts-social-feed">
            <div className="ts-social-feed__title">📡 Live Feed Preview</div>
            {(['ts-skeleton-w-85', 'ts-skeleton-w-77', 'ts-skeleton-w-69', 'ts-skeleton-w-61'] as const).map(
              (widthClass, i) => (
                <div
                  key={i}
                  className={`ts-skeleton ts-skeleton--h-xs ts-skeleton-mb ${widthClass}`}
                />
              )
            )}
          </div>
        </div>
      </PremiumTeaser>
    </TabPanel>
  );
}

export default TabSocial;