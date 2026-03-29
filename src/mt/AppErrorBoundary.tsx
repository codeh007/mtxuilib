"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { type PropsWithChildren, startTransition, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface ErrorFallbackProps {
	error: any;
	resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
	const handleRetry = useCallback(() => {
		// Use React 19's startTransition for smooth retry without hard refresh
		startTransition(() => {
			resetErrorBoundary();
		});
	}, [resetErrorBoundary]);

	return (
		<div
			data-slot="app-error-boundary"
			className="flex items-center justify-center min-h-screen bg-background p-4"
		>
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<AlertTriangle className="h-12 w-12 text-destructive" />
					</div>
					<CardTitle className="text-destructive">出现错误</CardTitle>
					<CardDescription className="text-sm text-muted-foreground">
						{error.message || "发生了意外错误，请重试"}
					</CardDescription>
				</CardHeader>
				<CardContent className="text-center space-y-3">
					<Button onClick={handleRetry} className="w-full" variant="default">
						<RefreshCw className="size-4 mr-2" />
						重试
					</Button>
					<details className="text-left">
						<summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
							查看错误详情
						</summary>
						<pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto max-h-32">
							{error.stack || error.message}
						</pre>
					</details>
				</CardContent>
			</Card>
		</div>
	);
}

interface AppErrorBoundaryProps extends PropsWithChildren {
	onError?: (error: any, errorInfo: React.ErrorInfo) => void;
	onReset?: () => void;
}

/**
 * 应用级错误边界组件 - 改进版本，不再使用硬刷新
 * 使用 React 19 的 startTransition 实现优雅的错误重试
 */
export function AppErrorBoundary({
	children,
	onError,
	onReset,
}: AppErrorBoundaryProps) {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={onError}
			onReset={onReset}
		>
			{children}
		</ErrorBoundary>
	);
}
