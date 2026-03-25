"use client";

import type * as React from "react";
import { Icons } from "../../icons/icons";
import { cn } from "../../lib/utils";
import { Input } from "../../ui/input";

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "placeholder"> {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value = "", onChange, placeholder = "搜索...", className, ...props }: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div data-slot="search-input" className={cn("relative ml-auto flex-1 md:grow-0", className)}>
      <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
