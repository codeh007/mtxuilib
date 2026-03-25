"use client";

import type * as React from "react";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export interface JsonObjectInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: unknown;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * 不依赖大型组件,实现简单的 JSON 编辑器
 * TODO: 渐进加载的方式加载大型JSON可视化编辑器,例如: @monaco-editor/react
 */
export function JsonObjectInput({ className, value, onChange, disabled, placeholder, ...props }: JsonObjectInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formatJson = (val: unknown): string => {
    try {
      return JSON.stringify(val, null, 2);
    } catch (_e) {
      return "";
    }
  };

  const parseJson = (val: string) => {
    try {
      return JSON.parse(val);
    } catch (_e) {
      return undefined;
    }
  };

  const handleChange = (newValue: string) => {
    onChange?.(newValue);
  };

  const handleBlur = () => {
    const parsed = parseJson(typeof value === "string" ? value : JSON.stringify(value));
    if (parsed !== undefined) {
      onChange?.(parsed);
      setIsEditing(false);
    }
  };

  return (
    <div
      data-slot="json-object-input"
      className={cn(
        "relative rounded-md border border-input bg-background",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className={cn(
            "w-full min-h-[200px] font-mono text-sm p-3 rounded-md",
            "bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            disabled && "cursor-not-allowed",
          )}
          value={typeof value === "string" ? value : formatJson(value)}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <button
          type="button"
          className={cn(
            "w-full min-h-[200px] font-mono text-sm p-3 rounded-md text-left",
            "cursor-pointer whitespace-pre overflow-auto",
            !value && "text-muted-foreground",
          )}
          onClick={() => {
            if (!disabled) {
              setIsEditing(true);
              setTimeout(() => {
                textareaRef.current?.focus();
              }, 0);
            }
          }}
        >
          {value ? formatJson(value) : placeholder}
        </button>
      )}
    </div>
  );
}
