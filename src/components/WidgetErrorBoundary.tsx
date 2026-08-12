"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface WidgetErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface WidgetErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

export default class WidgetErrorBoundary extends Component<
  WidgetErrorBoundaryProps,
  WidgetErrorBoundaryState
> {
  state: WidgetErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): WidgetErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
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
              The swap widget hit a sync issue. Retry or reconnect your wallet.
            </p>
            {this.state.errorMessage ? (
              <p className="mt-2 text-xs text-zinc-500">{this.state.errorMessage}</p>
            ) : null}
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, errorMessage: undefined })}
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
