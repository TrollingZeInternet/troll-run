"use client";

import type { WidgetConfig } from "@lifi/widget";
import { LiFiWidget, WidgetSkeleton } from "@lifi/widget";
import ClientOnly from "./ClientOnly";
import { lifiWidgetConfig } from "@/lib/lifi-config";

const skeletonConfig = {
  appearance: lifiWidgetConfig.appearance,
  variant: lifiWidgetConfig.variant,
  theme: lifiWidgetConfig.theme,
} as Partial<WidgetConfig>;

export default function LiFiBridgeWidget() {
  return (
    <ClientOnly fallback={<WidgetSkeleton config={skeletonConfig} />}>
      <LiFiWidget integrator="troll.run" config={lifiWidgetConfig} />
    </ClientOnly>
  );
}
