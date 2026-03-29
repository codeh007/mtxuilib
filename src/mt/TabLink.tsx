import { cva } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

const tabLinksVariants = cva("", {
	variants: {
		layout: {
			default:
				"inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",
			underlined:
				"w-full justify-start rounded-none border-b bg-transparent p-0",
		},
	},
	defaultVariants: {
		layout: "underlined",
	},
});

const tabLinkItemVariants = cva("", {
	variants: {
		variant: {
			underlined:
				"relative rounded-none border-b-2 border-b-transparent bg-transparent px-3 py-2 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground hover:border-gray-300 data-[active=true]:border-b-primary data-[active=true]:text-primary",
			default:
				"inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm",
		},
	},
	defaultVariants: {
		variant: "underlined",
	},
});

interface TabLinksProps {
	className?: string;
	layout?: "default" | "underlined";
	children: React.ReactNode;
}

interface TabLinkItemProps extends ComponentProps<typeof Link> {
	variant?: "default" | "underlined";
	children: React.ReactNode;
}

export function TabLinks({
	className,
	layout = "underlined",
	children,
}: TabLinksProps) {
	return (
		<nav className={cn(tabLinksVariants({ layout }), className)}>
			<div className="flex space-x-8">{children}</div>
		</nav>
	);
}

export function TabLinkItem({
	className,
	variant = "underlined",
	href,
	children,
	...props
}: TabLinkItemProps) {
	// const location = useLocation();
	// const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

	return (
		<Link
			href={href}
			className={cn(tabLinkItemVariants({ variant }), className)}
			{...props}
		>
			{children}
		</Link>
	);
}
