"use client";

import { Loader2 } from "lucide-react";
import type { PropsWithChildren } from "react";
import { cn } from "../lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Spinner } from "../ui/spinner";

interface BaseLoadingProps {
	className?: string;
}

/**
 * 简单的 "旋转图标 size-4"
 * 支持 className 自定义
 */
export const SkeletonLoadingSpinner = ({ className }: BaseLoadingProps) => {
	return (
		<div
			className={cn(
				"w-full mx-auto h-full flex justify-center items-center flex-1",
				className,
			)}
		>
			<Spinner />
		</div>
	);
};

export function SkeletonAvatar({ className }: BaseLoadingProps) {
	return <Skeleton className={cn("h-12 w-12 rounded-full", className)} />;
}

export function SkeletonText({
	className,
	width,
}: {
	className?: string;
	width?: string;
}) {
	return <Skeleton className={cn("h-4", width || "w-full", className)} />;
}

export function SkeletonTitle({ className }: BaseLoadingProps) {
	return <Skeleton className={cn("h-6 w-full", className)} />;
}

export function SkeletonButton({ className }: BaseLoadingProps) {
	return <Skeleton className={cn("h-10 w-20", className)} />;
}

export function ProfileSkeleton({ className }: BaseLoadingProps) {
	return (
		<div className={cn("flex items-center space-x-4", className)}>
			<SkeletonAvatar />
			<div className="space-y-2">
				<SkeletonText width="w-[250px]" />
				<SkeletonText width="w-[200px]" />
			</div>
		</div>
	);
}

export function CardSkeleton({ className }: BaseLoadingProps) {
	return (
		<div className={cn("p-4 border rounded-lg space-y-4", className)}>
			<SkeletonTitle />
			<SkeletonText width="w-3/4" />
			<SkeletonText width="w-1/2" />
		</div>
	);
}

export function ListSkeleton({
	rows = 3,
	className,
}: {
	rows?: number;
	className?: string;
}) {
	return (
		<div className={cn("space-y-4", className)}>
			{Array.from({ length: rows }, (_, i) => (
				<SkeletonTitle key={`list-skeleton-${i}`} />
			))}
		</div>
	);
}

export function FullPageSkeleton({ className }: BaseLoadingProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center h-screen w-screen",
				className,
			)}
		>
			<SkeletonAvatar className="h-16 w-16" />
			<SkeletonText className="mt-4 h-8 w-[300px]" />
		</div>
	);
}

export function CenterSkeleton({ className }: BaseLoadingProps) {
	return (
		<div
			className={cn("flex items-center justify-center min-h-screen", className)}
		>
			<SkeletonAvatar />
		</div>
	);
}

export function DocumentSkeleton({ className }: BaseLoadingProps) {
	return (
		<div className={cn("flex flex-col gap-4 w-full", className)}>
			<Skeleton className="h-12 w-1/2" />
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-5 w-1/3" />
			<div className="h-5 w-52" />
			<Skeleton className="h-8 w-52" />
			<Skeleton className="h-5 w-2/3" />
		</div>
	);
}

export function ItemSkeleton({ className }: BaseLoadingProps) {
	return (
		<div className={cn("block p-4 hover:bg-gray-50 sm:px-6", className)}>
			<Skeleton className="h-4 w-1/2" />
			<div className="mt-2">
				<Skeleton className="h-2 w-1/2" />
			</div>
		</div>
	);
}

export function InputSkeleton({ className }: BaseLoadingProps) {
	return (
		<Skeleton
			className={cn(
				"h-9 w-full rounded-md border px-3 py-1 shadow-sm",
				className,
			)}
		/>
	);
}

export function LayoutSkeleton({
	forceFullScreen,
	className,
	text,
	children,
}: PropsWithChildren<{
	forceFullScreen?: boolean;
	className?: string;
	text?: string;
}>) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8",
				forceFullScreen ? "fixed inset-0 z-50" : "min-h-screen",
				className,
			)}
		>
			<div className="relative">
				{children && (
					<div className="absolute inset-0 flex items-center justify-center">
						{children}
					</div>
				)}
			</div>
			{text && (
				<div className="mt-4 text-center text-muted-foreground">{text}</div>
			)}
		</div>
	);
}

export function PageSkeleton({
	showHeader = true,
	showFilters = false,
	showContent = true,
	contentRows = 3,
	className,
}: {
	showHeader?: boolean;
	showFilters?: boolean;
	showContent?: boolean;
	contentRows?: number;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-col space-y-4 p-4", className)}>
			{showHeader && <Skeleton className="h-8 w-1/3" />}
			{showFilters && <Skeleton className="h-10 w-full" />}
			{showContent && (
				<div className="space-y-2">
					{Array.from({ length: contentRows }, (_, i) => (
						<Skeleton key={`page-skeleton-${i}`} className="h-4 w-full" />
					))}
				</div>
			)}
		</div>
	);
}

export function TableSkeleton({
	rows = 5,
	className,
}: {
	rows?: number;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-col space-y-4 p-4", className)}>
			<Skeleton className="h-8 w-1/3 mb-6" />
			<div className="space-y-2">
				{Array.from({ length: rows }, (_, i) => (
					<Skeleton key={`table-skeleton-${i}`} className="h-10 w-full" />
				))}
			</div>
		</div>
	);
}

export function GridSkeleton({ className }: BaseLoadingProps) {
	return (
		<div className={cn("flex flex-col space-y-4 p-4", className)}>
			<Skeleton className="h-8 w-1/4" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Skeleton className="h-[200px] w-full" />
				<Skeleton className="h-[200px] w-full" />
			</div>
		</div>
	);
}

export function AdvancedPageSkeleton({
	showHeader = true,
	showFilters = true,
	showContent = true,
	contentRows = 5,
	className,
}: {
	showHeader?: boolean;
	showFilters?: boolean;
	showContent?: boolean;
	contentRows?: number;
	className?: string;
}) {
	return (
		<div className={cn("space-y-6 p-6", className)}>
			{showHeader && (
				<div className="flex justify-between items-center">
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-64" />
					</div>
					<div className="flex gap-2">
						<SkeletonButton />
						<SkeletonButton className="w-24" />
					</div>
				</div>
			)}

			{showFilters && (
				<div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
					<Skeleton className="h-10 flex-1" />
					<Skeleton className="h-10 w-32" />
				</div>
			)}

			{showContent && (
				<div className="space-y-4">
					{Array.from({ length: contentRows }, (_, i) => (
						<Skeleton key={`advanced-skeleton-${i}`} className="h-12 w-full" />
					))}
				</div>
			)}
		</div>
	);
}

export function LoadingSpinner({
	size = "default",
	className,
}: {
	size?: "sm" | "default" | "lg";
	className?: string;
}) {
	const sizeClasses = {
		sm: "h-4 w-4",
		default: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<div className={cn("flex items-center justify-center", className)}>
			<Loader2 className={cn("animate-spin", sizeClasses[size])} />
		</div>
	);
}

export function InlineLoading({ className }: { className?: string }) {
	return (
		<div className={cn("flex items-center justify-center py-8", className)}>
			<LoadingSpinner />
		</div>
	);
}

export function ButtonLoading({
	isLoading,
	children,

	className,
}: {
	isLoading: boolean;
	children: React.ReactNode;
	className?: string;
}) {
	if (isLoading) {
		return (
			<div className={cn("flex items-center gap-2", className)}>
				<Loader2 className="h-4 w-4 animate-spin" />
			</div>
		);
	}
	return <>{children}</>;
}

interface TableLoadingSkeletonProps extends BaseLoadingProps {
	rows?: number;
	showHeader?: boolean;
}

export function TableLoadingSkeleton({
	rows = 5,
	showHeader = true,
	className,
}: TableLoadingSkeletonProps) {
	return (
		<div className={cn("flex flex-col space-y-4 p-4", className)}>
			{showHeader && <Skeleton className="h-8 w-1/3 mb-6" />}
			<div className="space-y-2">
				{Array.from({ length: rows }, (_, i) => (
					<Skeleton
						key={`table-skeleton-${Date.now()}-${i}`}
						className="h-10 w-full"
					/>
				))}
			</div>
		</div>
	);
}

interface CardLoadingSkeletonProps extends BaseLoadingProps {
	columns?: 1 | 2 | 3 | 4;
	cardHeight?: string;
}

export function CardLoadingSkeleton({
	columns = 2,
	cardHeight = "200px",
	className,
}: CardLoadingSkeletonProps) {
	const gridClasses = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
	};

	return (
		<div className={cn("flex flex-col space-y-4 p-4", className)}>
			<Skeleton className="h-8 w-1/4" />
			<div className={cn("grid gap-4", gridClasses[columns])}>
				{Array.from({ length: columns * 2 }, (_, i) => (
					<Skeleton
						key={`card-skeleton-${Date.now()}-${i}`}
						className="w-full"
						style={{ height: cardHeight }}
					/>
				))}
			</div>
		</div>
	);
}

interface PageLoadingSkeletonProps extends BaseLoadingProps {
	showHeader?: boolean;
	showFilters?: boolean;
	showContent?: boolean;
	contentRows?: number;
	contentType?: "table" | "cards" | "list";
}

export function PageLoadingSkeleton({
	showHeader = true,
	showFilters = true,
	showContent = true,
	contentRows = 5,
	contentType = "table",
	className,
}: PageLoadingSkeletonProps) {
	return (
		<div className={cn("space-y-6 p-6", className)}>
			{showHeader && (
				<div className="space-y-2">
					<Skeleton className="h-8 w-1/3" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			)}

			{showFilters && (
				<div className="flex space-x-4">
					<Skeleton className="h-10 w-64" />
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-32" />
				</div>
			)}

			{showContent && (
				<div className="space-y-4">
					{contentType === "table" && (
						<TableLoadingSkeleton rows={contentRows} showHeader={false} />
					)}
					{contentType === "cards" && <CardLoadingSkeleton columns={2} />}
					{contentType === "list" && (
						<div className="space-y-3">
							{Array.from({ length: contentRows }, (_, i) => (
								<div
									key={`list-skeleton-${Date.now()}-${i}`}
									className="flex items-center space-x-4 p-4 border rounded-lg"
								>
									<Skeleton className="h-12 w-12 rounded-full" />
									<div className="space-y-2 flex-1">
										<Skeleton className="h-4 w-1/3" />
										<Skeleton className="h-3 w-1/2" />
									</div>
									<Skeleton className="h-8 w-20" />
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export function SkeletonCard({ className }: BaseLoadingProps) {
	return (
		<div className={cn("flex flex-col space-y-3", className)}>
			<Skeleton className="h-[125px] w-[250px] rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
}

export function SkeletonLoading({ className }: BaseLoadingProps) {
	return (
		<div
			className={cn(
				"mx-auto flex h-full w-full flex-col items-center justify-center rounded-md",
				className,
			)}
		>
			<div className="flex-1">
				<Skeleton className="h-9 w-full rounded-md border px-3 py-1 shadow-sm" />
			</div>
		</div>
	);
}
