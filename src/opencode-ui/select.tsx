"use client";

import { cn } from "../lib/utils";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as UiSelect,
} from "../ui/select";

export interface SelectProps {
	value?: string;
	onValueChange?: (value: string) => void;
	options: { value: string; label: string }[];
	className?: string;
}

export function Select({
	value,
	onValueChange,
	options,
	className,
}: SelectProps) {
	return (
		<UiSelect value={value} onValueChange={onValueChange}>
			<SelectTrigger className={cn("w-fit h-8", className)}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{options.map((opt) => (
					<SelectItem key={opt.value} value={opt.value}>
						{opt.label}
					</SelectItem>
				))}
			</SelectContent>
		</UiSelect>
	);
}
