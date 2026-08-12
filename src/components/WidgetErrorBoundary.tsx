"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface WidgetErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface WidgetErrorBoundaryState {
  hasError: boolean;
}

export default class WidgetErrorBoundary extends Component<
  WidgetErrorBoundaryProps,
  WidgetErrorBoundaryState
> {
  state: WidgetErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WidgetErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Relay widget error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm font-semibold text-white">
              Wallet connected, but the swap widget needs a refresh.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="btn-primary mt-4 rounded-full px-5 py-2.5 text-sm font-bold text-black"
            >
              Retry widget
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
