"use client";

import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import type * as React from "react";
import { useEffect } from "react";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export interface KeyValueType {
  key: string;
  value: string;
  hidden: boolean;
  locked: boolean;
  deleted: boolean;
}

interface EnvGroupArrayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  values: KeyValueType[];
  setValues?: (values: KeyValueType[]) => void;
  disabled?: boolean;
  secretOption?: boolean;
}

export function EnvGroupArray({
  label,
  values,
  setValues = () => {},
  disabled,
  secretOption,
  className,
  ...props
}: EnvGroupArrayProps) {
  useEffect(() => {
    if (!values) {
      setValues([]);
    }
  }, [setValues, values]);

  const handleValueChange = (index: number, key: string, value: string | boolean) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [key]: value };
    setValues(newValues);
  };

  const handleRemoveEntry = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  const handleAddEntry = () => {
    const newValues = [
      ...values,
      {
        key: "",
        value: "",
        hidden: false,
        locked: false,
        deleted: false,
      },
    ];
    setValues(newValues);
  };

  return (
    <div data-slot="env-group-array" className={cn("space-y-4", className)} {...props}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <div className="space-y-3">
        {values
          ?.filter((entry: KeyValueType) => !entry.deleted)
          .map((entry: KeyValueType, i: number) => (
            <div className="flex items-start gap-2" key={`${entry.key}-${i}`}>
              <Input
                placeholder="键名"
                value={entry.key}
                onChange={(e) => handleValueChange(i, "key", e.target.value)}
                disabled={disabled || entry.locked}
                className={cn("w-48", entry.locked && "cursor-not-allowed opacity-50")}
              />

              {entry.hidden ? (
                <Input
                  placeholder="值"
                  value={entry.value}
                  onChange={(e) => handleValueChange(i, "value", e.target.value)}
                  type="password"
                  disabled={disabled || entry.locked}
                  className={cn("flex-1", entry.locked && "cursor-not-allowed opacity-50")}
                />
              ) : (
                <Textarea
                  placeholder="值"
                  value={entry.value}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleValueChange(i, "value", e.target.value)
                  }
                  rows={Math.max(1, entry.value?.split("\n").length || 1)}
                  disabled={disabled || entry.locked}
                  className={cn("flex-1 min-h-9", entry.locked && "cursor-not-allowed opacity-50")}
                />
              )}

              {secretOption && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => !entry.locked && handleValueChange(i, "hidden", !entry.hidden)}
                  disabled={disabled || entry.locked}
                  aria-label={entry.hidden ? "显示值" : "隐藏值"}
                >
                  {entry.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              )}

              {!disabled && (
                <Button variant="outline" size="icon" onClick={() => handleRemoveEntry(i)} aria-label="删除条目">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
      </div>

      {!disabled && (
        <Button variant="outline" onClick={handleAddEntry} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          添加条目
        </Button>
      )}
    </div>
  );
}
