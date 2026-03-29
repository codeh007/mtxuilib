import { Geist_Mono as FontMono, Geist as FontSans } from "next/font/google";
import { cn } from "../lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap", // 优化字体加载性能
});

const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
	weight: ["400"],
	display: "swap", // 优化字体加载性能
});

export const fontVariables = cn(fontSans.variable, fontMono.variable);
