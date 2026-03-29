"use client";

import { cva } from "class-variance-authority";
import {
	CheckCircle,
	Clock,
	Loader2,
	Play,
	Square,
	XCircle,
} from "lucide-react";
import { cn } from "../lib/utils";

const statusIconVariants = cva("", {
	variants: {
		size: {
			sm: "h-3 w-3",
			md: "h-4 w-4",
			lg: "h-5 w-5",
		},
		status: {
			success: "text-green-600 dark:text-green-400",
			active: "text-green-500 dark:text-green-400",
			pending: "text-yellow-500 dark:text-yellow-400",
			error: "text-destructive",
			cancelled: "text-muted-foreground",
			inactive: "text-muted-foreground",
			default: "text-muted-foreground",
		},
	},
	defaultVariants: {
		size: "md",
		status: "default",
	},
});

interface StatusIconProps {
	status: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}

/**
 * 通用状态图标组件
 * 根据状态显示对应的图标，使用shadcn-ui颜色系统
 */
export function StatusIcon({
	status,
	className,
	size = "md",
}: StatusIconProps) {
	const getStatusConfig = (status: string) => {
		const normalizedStatus = status.toLowerCase();

		switch (normalizedStatus) {
			case "completed":
			case "success":
			case "finished":
				return { icon: CheckCircle, variant: "success" as const };

			case "running":
			case "active":
			case "processing":
				return { icon: Play, variant: "active" as const };

			case "starting":
			case "loading":
			case "pending":
				return { icon: Loader2, variant: "pending" as const, animate: true };

			case "failed":
			case "error":
				return { icon: XCircle, variant: "error" as const };

			case "cancelled":
			case "canceled":
				return { icon: XCircle, variant: "cancelled" as const };

			case "inactive":
			case "stopped":
			case "paused":
				return { icon: Square, variant: "inactive" as const };

			case "submitted":
			case "waiting":
				return { icon: Clock, variant: "pending" as const };

			default:
				return { icon: Clock, variant: "default" as const };
		}
	};

	const config = getStatusConfig(status);
	const Icon = config.icon;

	return (
		<Icon
			className={cn(
				statusIconVariants({ size, status: config.variant }),
				config.animate && "animate-spin",
				className,
			)}
		/>
	);
}
