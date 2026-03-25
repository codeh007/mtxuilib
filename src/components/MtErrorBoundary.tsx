"use client";

import { AlertTriangle, Bug, RefreshCw, X } from "lucide-react";
import {
  type ErrorInfo,
  type PropsWithChildren,
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

interface ErrorFallbackProps extends FallbackProps {
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error: rawError, resetErrorBoundary }: ErrorFallbackProps) {
  const error = rawError instanceof Error ? rawError : new Error(String(rawError));
  const [showDebug, setShowDebug] = useState(false);

  const handleRetry = useCallback(() => {
    startTransition(() => {
      resetErrorBoundary();
    });
  }, [resetErrorBoundary]);

  const toggleDebug = useCallback(() => {
    setShowDebug((prev) => !prev);
  }, []);

  useEffect(() => {
    if (error) {
      console.log("client error3", error);
    }
  }, [error]);

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center w-full h-full min-h-[120px] p-4 relative bg-destructive/5 border border-destructive/20 rounded-md"
    >
      {/* Main error display - icon and message-focused */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="bg-destructive/10 p-2 rounded-full">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-destructive">组件发生错误</h3>
          <p className="text-xs text-muted-foreground max-w-[250px] break-words line-clamp-3">
            {error.message || "发生了未知错误"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRetry}
          className="flex items-center gap-1.5 px-3 py-1.5 mt-2 text-xs font-medium bg-background border shadow-sm hover:bg-muted transition-colors rounded-md"
          title="Retry"
        >
          <RefreshCw className="size-3.5" />
          <span>重试加载</span>
        </button>
      </div>

      {/* Debug button - small and unobtrusive */}
      <button
        type="button"
        onClick={toggleDebug}
        className="absolute top-2 right-2 p-1.5 text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors rounded"
        title="Debug info"
      >
        <Bug className="size-3.5" />
      </button>

      {/* Debug modal */}
      {showDebug && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="text-sm font-medium">Error Details</h3>
              <button
                type="button"
                onClick={toggleDebug}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-3 overflow-auto max-h-[60vh]">
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Message</h4>
                  <p className="text-xs font-mono bg-muted p-2 rounded">{error.message}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Stack Trace</h4>
                  <pre className="text-xs font-mono bg-muted p-2 rounded overflow-auto max-h-40">
                    {error.stack || "No stack trace available"}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MtErrorBoundaryProps extends PropsWithChildren {
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: unknown, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

/**
 * Minimal error boundary component using react-error-boundary with React 19 startTransition
 * Provides graceful error handling and retry functionality without hard refresh
 * Adapts to any container size and maintains clean, icon-focused design
 */
export const MtErrorBoundary = ({
  children,
  fallback: FallbackComponent = ErrorFallback,
  onError,
  onReset,
}: MtErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={(error: unknown, info: ErrorInfo) => {
        // onError(error,info)
        console.log("on error2", error, info);
        onError?.(error, info);
      }}
      onReset={onReset}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full min-h-[60px] text-xs text-muted-foreground">
            Loading...
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
