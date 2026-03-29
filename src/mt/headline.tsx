"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/utils";

const headlineVariants = cva("flex", {
	variants: {
		layout: {
			default: "justify-between",
			center: "justify-center text-center",
			start: "justify-start",
		},
		size: {
			sm: "",
			md: "",
			lg: "",
		},
	},
	defaultVariants: {
		layout: "default",
		size: "md",
	},
});

const headingVariants = cva("font-bold tracking-wide text-foreground", {
	variants: {
		size: {
			sm: "text-lg",
			md: "text-2xl",
			lg: "text-3xl",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface HeadlineProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof headlineVariants>,
		VariantProps<typeof headingVariants> {
	heading: string;
	text?: string;
	children?: React.ReactNode;
}

export function Headline({
	heading,
	text,
	children,
	className,
	layout,
	size,
	...props
}: HeadlineProps) {
	return (
		<div
			data-slot="headline"
			className={cn(headlineVariants({ layout }), className)}
			{...props}
		>
			<div className={cn("grid gap-1", layout === "center" && "text-center")}>
				<h1 className={headingVariants({ size })}>{heading}</h1>
				{text && <p className="text-muted-foreground">{text}</p>}
			</div>
			{children && <div className="flex items-center gap-2">{children}</div>}
		</div>
	);
}
