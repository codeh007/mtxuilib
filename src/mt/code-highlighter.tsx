"use client";

import { useTheme } from "next-themes";
import { useRef } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";
// 使用 VS Code 风格的主题
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "../lib/utils";
import { CopyToClipboard } from "./copy-button";

// 注册常用语言
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("json", json);

interface CodeHighlighterProps {
	code: string;
	copyCode?: string;
	setCode?: (code: string) => void;
	language: string;
	className?: string;
	maxHeight?: string;
	minHeight?: string;
	maxWidth?: string;
	copy?: boolean;
	wrapLines?: boolean;
}

export function CodeHighlighter({
	code,
	copyCode,
	setCode,
	language,
	className,
	maxHeight,
	minHeight,
	maxWidth,
	copy = true,
	wrapLines = false, // 默认不换行，模仿 IDE 滚动体验
}: CodeHighlighterProps) {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// 基础样式配置 - 模仿 VS Code
	const customStyle: React.CSSProperties = {
		margin: 0,
		padding: "1rem", // 舒适的内边距
		background: "transparent", // 背景透明，由容器控制
		fontSize: "0.85rem", // ~13.6px，接近 VS Code 默认字号
		lineHeight: "1.5", // 良好的行高
		fontFamily:
			"var(--font-mono), 'Geist Mono', 'Fira Code', Consolas, monospace",
		width: "100%",
		height: "100%",
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: .
		<div
			className={cn(
				"group relative w-full overflow-hidden rounded-md border",
				// 容器背景色：适配黑白主题
				"bg-zinc-50 dark:bg-[#1e1e1e]",
				// 确保文本可选
				"select-text cursor-text",
				className,
			)}
			style={{
				maxWidth,
				// 如果没有传入具体高度，且不处于编辑模式，允许自适应
				minHeight: minHeight || "auto",
				maxHeight: maxHeight || "auto",
			}}
			// 点击容器聚焦编辑框（如果有）
			onClick={() => setCode && textareaRef.current?.focus()}
		>
			{/* 编辑模式：覆盖透明 Textarea */}
			{setCode && (
				<textarea
					ref={textareaRef}
					value={code}
					onChange={(e) => setCode(e.target.value)}
					className={cn(
						"absolute inset-0 z-10 h-full w-full resize-none overflow-hidden whitespace-pre bg-transparent p-4 font-mono text-[0.85rem] leading-[1.5] text-transparent caret-foreground outline-none",
						// 编辑时允许输入，但文字透明
					)}
					autoCorrect="off"
					spellCheck={false}
					autoCapitalize="off"
				/>
			)}

			{/* 核心高亮组件 */}
			<div
				className={cn(
					"relative w-full h-full",
					// 处理滚动：如果不换行，允许横向滚动；如果换行，隐藏横向滚动
					wrapLines ? "overflow-x-hidden" : "overflow-x-auto custom-scrollbar",
				)}
			>
				<SyntaxHighlighter
					language={language}
					style={isDark ? vs2015 : vs}
					wrapLines={wrapLines}
					showLineNumbers={false} // 简洁模式，如果需要行号可以做成 prop
					customStyle={customStyle}
					codeTagProps={{
						style: {
							fontFamily: "inherit",
							fontSize: "inherit",
						},
					}}
				>
					{code?.trim() || ""}
				</SyntaxHighlighter>
			</div>

			{/* 复制按钮 - 悬浮显示或始终显示 */}
			{copy && (
				<div className="absolute right-2 top-2 z-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					<div className="rounded-md border bg-background/80 shadow-sm backdrop-blur-sm">
						<CopyToClipboard
							text={(copyCode || code).trim()}
							withText={false}
							className="h-7 w-7 text-muted-foreground hover:text-foreground"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
