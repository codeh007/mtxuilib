"use client";

import Link from "next/link";
import { cn } from "../lib/utils";
import { BreadcrumbItem } from "../ui/breadcrumb";
import { buttonVariants } from "../ui/button";

interface GoBackProps {
	to: string;
}

export function GoBack({ to }: GoBackProps) {
	return (
		<BreadcrumbItem data-slot="go-back">
			<Link href={to} className={cn(buttonVariants({ variant: "ghost" }))}>
				返回
			</Link>
		</BreadcrumbItem>
	);
}
