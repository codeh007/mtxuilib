"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Icons } from "../icons/icons";
import { cn } from "../lib/utils";

const spinnerVariants = cva("animate-spin", {
	variants: {
		size: {
			sm: "h-3 w-3",
			md: "h-4 w-4",
			lg: "h-6 w-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
	className?: string;
}

export function Spinner({ size, className }: SpinnerProps) {
	return (
		<Icons.spinner
			data-slot="spinner"
			className={cn(spinnerVariants({ size }), "mr-2", className)}
		/>
	);
}

interface MtLoadingProps {
	className?: string;
	size?: "sm" | "md" | "lg";
}

export function MtLoading({ className, size = "md" }: MtLoadingProps) {
	return (
		<div
			data-slot="mt-loading"
			className={cn("flex flex-row flex-1 w-full h-full", className)}
		>
			<Spinner size={size} />
		</div>
	);
}
