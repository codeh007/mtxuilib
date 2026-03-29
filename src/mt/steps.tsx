"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Children, cloneElement, isValidElement } from "react";
import { cn } from "../lib/utils";

const stepsVariants = cva(
	"ml-4 mb-12 border-l border-border pl-6 [counter-reset:step] flex flex-col gap-12",
);

const stepVariants = cva(
	"absolute flex h-8 w-8 items-center justify-center rounded-full border-4 border-muted bg-muted text-sm font-medium text-foreground",
	{
		variants: {
			variant: {
				default: "border-muted bg-muted",
				active: "border-primary bg-primary text-primary-foreground",
				completed: "border-primary bg-primary text-primary-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	children: React.ReactNode;
	stepNumber?: number;
	variant?: "default" | "active" | "completed";
}

export function Step({
	title,
	children,
	stepNumber,
	variant = "default",
	className,
	...props
}: StepProps) {
	return (
		<div data-slot="step" className={cn("relative", className)} {...props}>
			<div className={cn(stepVariants({ variant }), "mt-1 ml-[-41px]")}>
				{stepNumber}
			</div>
			<div className="pl-12">
				{title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}
				<div className="text-muted-foreground">{children}</div>
			</div>
		</div>
	);
}

interface StepsProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof stepsVariants> {}

export function Steps({ className, children, ...props }: StepsProps) {
	return (
		<div
			data-slot="steps"
			className={cn(stepsVariants(), className)}
			{...props}
		>
			{Children.map(children, (child, index) =>
				isValidElement(child)
					? cloneElement(child as React.ReactElement<StepProps>, {
							stepNumber: index + 1,
						})
					: child,
			)}
		</div>
	);
}
