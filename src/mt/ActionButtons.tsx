"use client";

import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ActionItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  separator?: boolean; // 在此项后添加分隔符
}

interface ActionButtonsProps {
  actions: ActionItem[];
  triggerLabel?: string;
  size?: "sm" | "md" | "lg";
}

export function ActionButtons({ actions, triggerLabel = "操作", size = "md" }: ActionButtonsProps) {
  const buttonSizes = {
    sm: "h-6 w-6 p-0",
    md: "h-8 w-8 p-0",
    lg: "h-10 w-10 p-0",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={buttonSizes[size]}>
          <MoreHorizontal className="size-4" />
          <span className="sr-only">{triggerLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{triggerLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => (
          <div key={`${action.label}-${index}`}>
            <DropdownMenuItem
              onClick={action.onClick}
              disabled={action.disabled}
              className={action.variant === "destructive" ? "text-destructive focus:text-destructive" : ""}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
            {action.separator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
