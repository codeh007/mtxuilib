"use client";

import { Badge } from "../ui/badge";

interface StatusBadgeProps {
	status: string;
	className?: string;
	variant?: "default" | "secondary" | "destructive" | "outline";
}

export function StatusBadge({ status, className, variant }: StatusBadgeProps) {
	const getStatusBadgeVariant = (status: string) => {
		if (variant) return variant;

		const normalizedStatus = status.toLowerCase();

		switch (normalizedStatus) {
			case "active":
			case "enabled":
			case "online":
			case "running":
			case "success":
			case "completed":
				return "default" as const;
			case "inactive":
			case "disabled":
			case "offline":
			case "stopped":
			case "pending":
			case "waiting":
				return "secondary" as const;
			case "error":
			case "failed":
			case "deleted":
			case "blocked":
				return "destructive" as const;
			default:
				return "outline" as const;
		}
	};

	const getStatusDisplayName = (status: string) => {
		const statusMap: Record<string, string> = {
			active: "活跃",
			inactive: "非活跃",
			enabled: "启用",
			disabled: "禁用",
			online: "在线",
			offline: "离线",
			running: "运行中",
			stopped: "已停止",
			success: "成功",
			failed: "失败",
			error: "错误",
			pending: "待处理",
			waiting: "等待中",
			completed: "已完成",
			deleted: "已删除",
			blocked: "已阻止",
		};

		return statusMap[status.toLowerCase()] || status;
	};

	return (
		<Badge variant={getStatusBadgeVariant(status)} className={className}>
			{getStatusDisplayName(status)}
		</Badge>
	);
}
