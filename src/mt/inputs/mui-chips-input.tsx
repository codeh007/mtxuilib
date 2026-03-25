"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";

interface ChipsInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * 芯片输入组件，仿 mui-chips-input
 * 参考官网：https://viclafouch.github.io/mui-chips-input/
 */
export function ChipsInput({
  onChange,
  value = [],
  placeholder = "添加标签...",
  className,
  disabled = false,
}: ChipsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newChip = inputValue.trim();
      if (!value.includes(newChip)) {
        onChange?.([...value, newChip]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  const removeChip = (chipToRemove: string) => {
    onChange?.(value.filter((chip) => chip !== chipToRemove));
  };

  return (
    <div
      data-slot="chips-input"
      className={cn(
        "flex min-h-9 w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {value.map((chip, index) => (
        <Badge key={`${chip}-${index}`} variant="secondary" className="gap-1 pr-1 text-xs">
          {chip}
          {!disabled && (
            <button
              type="button"
              onClick={() => removeChip(chip)}
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`Remove ${chip} chip`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 border-0 bg-transparent p-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}

// 保持向后兼容性的别名
export const MuiChipsInput = ChipsInput;
