"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

interface PasswordInputProps
	extends Omit<React.ComponentProps<typeof Input>, "type"> {
	showToggle?: boolean;
	isTextarea?: boolean;
}

export function PasswordInput({
	className,
	showToggle = true,
	isTextarea = false,
	...props
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div
			data-slot="password-input"
			className="relative group/password-input relative w-full"
		>
			{isTextarea ? (
				<Textarea
					className={cn("pr-10", className)}
					style={{ WebkitTextSecurity: showPassword ? "none" : "disc" } as any}
					{...(props as any)}
				/>
			) : (
				<Input
					type={showPassword ? "text" : "password"}
					className={cn("pr-10", className)}
					{...props}
				/>
			)}
			{showToggle && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className={cn(
						"absolute right-1 px-2 py-1 text-muted-foreground hover:bg-transparent hover:text-foreground",
						isTextarea ? "top-1 h-8 w-8" : "top-1/2 -translate-y-1/2 h-7 w-7",
					)}
					onClick={togglePasswordVisibility}
					aria-label={showPassword ? "隐藏" : "显示"}
				>
					{showPassword ? (
						<EyeOff className="h-4 w-4 shrink-0 transition-all text-muted-foreground" />
					) : (
						<Eye className="h-4 w-4 shrink-0 transition-all text-muted-foreground" />
					)}
				</Button>
			)}
		</div>
	);
}
