"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type * as React from "react";
import { cn } from "../lib/utils";

export interface TabsProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
	variant?: "normal" | "alt" | "settings";
}

export interface TabsListProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

export interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
	classes?: {
		button?: string;
	};
	hideCloseButton?: boolean;
	closeButton?: React.ReactNode;
	onMiddleClick?: () => void;
}

export interface TabsContentProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

function TabsRoot({
	className,
	variant = "normal",
	orientation = "horizontal",
	...props
}: TabsProps) {
	return (
		<TabsPrimitive.Root
			orientation={orientation}
			data-component="tabs"
			data-variant={variant}
			data-orientation={orientation}
			className={className}
			{...props}
		/>
	);
}

function TabsList({ className, ...props }: TabsListProps) {
	return (
		<TabsPrimitive.List
			{...props}
			data-slot="tabs-list"
			className={className}
		/>
	);
}

function TabsTrigger({
	className,
	classes,
	children,
	closeButton,
	hideCloseButton,
	onMiddleClick,
	...props
}: TabsTriggerProps) {
	return (
		<div
			data-slot="tabs-trigger-wrapper"
			className={className}
			onAuxClick={(e) => {
				if (e.button === 1 && onMiddleClick) {
					e.preventDefault();
					onMiddleClick();
				}
			}}
		>
			<TabsPrimitive.Trigger
				{...props}
				data-slot="tabs-trigger"
				className={cn("group/tab", classes?.button)}
			>
				{children}
			</TabsPrimitive.Trigger>
			{closeButton && (
				<div
					data-slot="tabs-trigger-close-button"
					data-hidden={hideCloseButton || undefined}
				>
					{closeButton}
				</div>
			)}
		</div>
	);
}

function TabsContent({ className, children, ...props }: TabsContentProps) {
	return (
		<TabsPrimitive.Content
			{...props}
			data-slot="tabs-content"
			className={className}
		>
			{children}
		</TabsPrimitive.Content>
	);
}

const TabsSectionTitle = ({ children }: { children: React.ReactNode }) => {
	return <div data-slot="tabs-section-title">{children}</div>;
};

export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
	SectionTitle: TabsSectionTitle,
});
