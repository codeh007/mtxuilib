"use client";

import { getRelativeTimeStringCN } from "../lib/utils";

interface RelativeTimeProps {
	date: string | number | Date;
	showFullDate?: boolean;
	className?: string;
	//FIXME: 添加local 参数,表示语言区域,默认是美国.并修正相关代码.
}

export function RelativeTime({
	date,
	showFullDate = false,
	className,
}: RelativeTimeProps) {
	const relativeTime = getRelativeTimeStringCN(date);
	const fullDate = new Date(date).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

	if (showFullDate) {
		return (
			<span className={className} title={relativeTime}>
				{fullDate}
			</span>
		);
	}

	return (
		<span className={className} title={fullDate}>
			{relativeTime}
		</span>
	);
}
