"use client";

import { X } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";

interface TagsInputProps
	extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
	value?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	className?: string;
}

export function TagsInput({
	value = [],
	onChange,
	placeholder = "输入标签后按回车或空格添加",
	className,
	...props
}: TagsInputProps) {
	const [tags, setTags] = useState<string[]>(value);
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			addTag();
		} else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
			removeTag(tags.length - 1);
		}
	};

	const addTag = () => {
		const trimmedInput = inputValue.trim();
		if (trimmedInput && !tags.includes(trimmedInput)) {
			const newTags = [...tags, trimmedInput];
			setTags(newTags);
			setInputValue("");
			onChange?.(newTags);
		} else {
			setInputValue("");
		}
	};

	const removeTag = (indexToRemove: number) => {
		const newTags = tags.filter((_, index) => index !== indexToRemove);
		setTags(newTags);
		onChange?.(newTags);
	};

	return (
		<div
			data-slot="tags-input"
			className={cn(
				"flex min-h-9 w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
				className,
			)}
		>
			{tags.map((tag, index) => (
				<Badge
					key={`${tag}-${index}`}
					variant="secondary"
					className="gap-1 pr-1 text-xs"
				>
					{tag}
					<button
						type="button"
						onClick={() => removeTag(index)}
						className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
						aria-label={`Remove ${tag} tag`}
					>
						<X className="h-3 w-3" />
					</button>
				</Badge>
			))}
			<Input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onKeyDown={handleInputKeyDown}
				onBlur={addTag}
				placeholder={placeholder}
				className="flex-1 border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
				{...props}
			/>
		</div>
	);
}
