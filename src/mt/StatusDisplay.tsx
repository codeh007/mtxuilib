"use client";

import { cn } from "../lib/utils";
import { StatusBadge } from "./StatusBadge";
import { StatusIcon } from "./StatusIcon";

interface StatusDisplayProps {
  status: string;
  showIcon?: boolean;
  showBadge?: boolean;
  iconSize?: "sm" | "md" | "lg";
  className?: string;
  layout?: "horizontal" | "vertical";
}

/**
 * 状态显示组件 - 组合状态图标和徽章
 * 提供灵活的状态显示方式
 */
export function StatusDisplay({
  status,
  showIcon = true,
  showBadge = true,
  iconSize = "md",
  className,
  layout = "horizontal",
}: StatusDisplayProps) {
  return (
    <div
      data-slot="status-display"
      className={cn(
        layout === "horizontal" ? "flex items-center space-x-2" : "flex flex-col items-center space-y-1",
        className,
      )}
    >
      {showIcon && <StatusIcon status={status} size={iconSize} />}
      {showBadge && <StatusBadge status={status} />}
    </div>
  );
}
