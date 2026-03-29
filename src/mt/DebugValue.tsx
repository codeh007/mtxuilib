"use client";

import { Braces, Bug, Check, Copy } from "lucide-react";
import dynamic from "next/dynamic";
import type React from "react";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
	useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { createStore, type StateCreator, useStore } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CodeHighlighter = dynamic(
	() => import("./code-highlighter").then((mod) => mod.CodeHighlighter),
	{
		loading: () => (
			<div className="p-8 text-xs text-muted-foreground text-center animate-pulse">
				Loading viewer...
			</div>
		),
		ssr: false,
	},
);

interface DebugProps {
	debug?: boolean;
}
export interface MtmaiState extends DebugProps {
	setDebug: (debug?: boolean) => void;
}

const createDebugSlice: StateCreator<MtmaiState, [], [], MtmaiState> = (
	set,
	_get,
	init,
) => {
	return {
		debug: false,
		...init,
		setDebug: (debug) => set({ debug }),
	};
};

type mtappStore = ReturnType<typeof createMtAppStore>;
type MainStoreState = MtmaiState;

const createMtAppStore = (initProps?: Partial<MainStoreState>) => {
	const initialState = { ...initProps };
	return createStore<MainStoreState>()(
		subscribeWithSelector(
			devtools(
				persist(
					immer((...a) => ({
						...createDebugSlice(...a),
						...initialState,
					})),
					{
						name: "debug-store",
					},
				),
			),
		),
	);
};
const mtmaiStoreContext = createContext<mtappStore | null>(null);

type AppProviderProps = React.PropsWithChildren<DebugProps>;
export const DebugProvider = (props: AppProviderProps) => {
	const { children, ...etc } = props;
	const store = useMemo(() => {
		return createMtAppStore({ ...etc });
	}, [etc]);

	useHotkeys("alt+0", () => {
		store.setState({ debug: !store.getState().debug });
	}, [store]);

	return (
		<mtmaiStoreContext.Provider value={store}>
			{children}
		</mtmaiStoreContext.Provider>
	);
};

const DEFAULT_USE_SHALLOW = false;
export function useDebug(): MainStoreState;
export function useDebug<T>(selector: (state: MainStoreState) => T): T;
export function useDebug<T>(selector?: (state: MainStoreState) => T) {
	const store = useContext(mtmaiStoreContext);
	if (!store) throw new Error("useDebug must in DebugProvider");
	if (selector) {
		// biome-ignore lint/correctness/useHookAtTopLevel: .
		return useStore(
			store,
			DEFAULT_USE_SHALLOW ? useShallow(selector) : selector,
		);
	}
	// biome-ignore lint/correctness/useHookAtTopLevel: .
	return useStore(store);
}

// --- Component Logic ---

export interface DebugValueProps {
	title?: string;
	data: unknown;
	className?: string;
}

export function DebugValue({
	title,
	data,
	className,
}: PropsWithChildren<DebugValueProps>) {
	const debug = useDebug((x) => x.debug);
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const jsonString = useMemo(() => {
		try {
			return JSON.stringify(data, null, 2);
		} catch (_e) {
			return String(data);
		}
	}, [data]);

	const handleCopy = () => {
		if (!jsonString) return;
		navigator.clipboard.writeText(jsonString);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (!debug) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="inline-flex align-middle">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="button"
								size="icon"
								variant="outline"
								className={cn(
									"h-5 w-5 rounded-md p-0 opacity-60 hover:opacity-100 transition-all",
									"border-dashed border-yellow-500/50 hover:border-yellow-500 hover:bg-yellow-500/10 text-yellow-600",
									className,
								)}
							>
								<Bug className="size-3" />
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side="top"
							className="text-xs max-w-[200px] break-all"
						>
							Inspect: {title || "Data"}
						</TooltipContent>
					</Tooltip>
				</div>
			</DialogTrigger>

			<DialogContent
				className={cn(
					"flex flex-col gap-0 p-0 overflow-hidden",
					"w-[95vw] h-[80vh]",
					// 桌面端：最大宽度 4xl, 高度自适应但有上限
					"sm:max-w-4xl sm:h-auto sm:max-h-[85vh]",
					"rounded-xl border shadow-2xl",
				)}
			>
				{/* Header */}
				<DialogHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3 border-b bg-muted/30 shrink-0 pr-14 relative">
					{/* Left: Title & Info */}
					<div className="flex items-center gap-2 overflow-hidden min-w-0">
						<div className="bg-yellow-100 dark:bg-yellow-900/30 p-1.5 rounded-md shrink-0">
							<Braces className="size-4 text-yellow-600 dark:text-yellow-400" />
						</div>
						<div className="flex flex-col min-w-0">
							<DialogTitle className="text-sm font-semibold truncate leading-none">
								{title || "Debug Inspector"}
							</DialogTitle>
							<DialogDescription className="text-[10px] text-muted-foreground truncate font-mono mt-1">
								JSON · {new Blob([jsonString]).size} bytes
							</DialogDescription>
						</div>
					</div>

					{/* Right: Actions */}
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="sm"
							className="h-7 px-2 text-xs gap-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
							onClick={handleCopy}
						>
							{copied ? (
								<>
									<Check className="size-3.5 text-green-500" />
									<span className="text-green-600">Copied</span>
								</>
							) : (
								<>
									<Copy className="size-3.5" />
									<span>Copy</span>
								</>
							)}
						</Button>
					</div>
				</DialogHeader>

				{/* Content Area */}
				{/*
            添加 selection-text 和 cursor-text 确保文本可被选中。
            保留 overflow-auto 确保 Shift+滚轮 可用。
        */}
				<div className="flex-1 min-h-0 bg-muted/5 relative overflow-auto overscroll-contain">
					<div className="min-w-max p-4 inline-block align-top select-text cursor-text">
						<CodeHighlighter
							code={jsonString}
							language="json"
							// 仅保留布局相关的类，移除 font-mono, whitespace, select-text 等样式覆盖
							// max-h-none 确保 Dialog 内部由外层 ScrollArea 控制滚动
							className="border-0 bg-transparent"
							wrapLines={false}
							copy={false} // 使用 Dialog Header 上的复制按钮，禁用组件内部的
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export const OnlyDebug = ({ children }: PropsWithChildren) => {
	const isDebug = useDebug((x) => x.debug);
	if (!isDebug) return null;
	return <>{children}</>;
};
