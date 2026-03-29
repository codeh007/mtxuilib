"use client";
import type React from "react";
import { cn } from "../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "normal" | "error" | "warning" | "success" | "info";
}

export function Card({
	variant = "normal",
	className,
	children,
	...props
}: CardProps) {
	return (
		<div
			{...props}
			data-component="card"
			data-variant={variant}
			className={cn(className)}
		>
			{children}
		</div>
	);
}
