"use client";

import { CircleHelp } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/utils";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";

interface InlineContextTooltipProps {
	className?: string;
	children: React.ReactNode;
	title?: string;
}

export function InlineContextTooltip({
	className,
	children,
	title = "What's this?",
}: InlineContextTooltipProps) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<span className="inline-flex items-center ml-1">
					<CircleHelp className="h-3 w-3 text-muted-foreground" />
				</span>
			</HoverCardTrigger>
			<HoverCardContent className={cn("w-[300px] text-wrap", className)}>
				<p className="font-medium text-foreground">{title}</p>
				<div className="text-muted-foreground">{children}</div>
			</HoverCardContent>
		</HoverCard>
	);
}
