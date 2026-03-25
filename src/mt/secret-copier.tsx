"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import type * as React from "react";
import { useRef, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";
import { anOldHope, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CopyToClipboard } from "./copy-button";

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("json", json);

type Secrets = Record<string, string>;

const formats = {
  TABLE: "table",
  JSON: "json",
  YAML: "yaml",
  DOTENV: "dotenv",
  CLI: "cli",
} as const;

type Format = (typeof formats)[keyof typeof formats];

interface SecretCopierProps extends React.HTMLAttributes<HTMLDivElement> {
  secrets: Secrets;
  maxHeight?: string;
  maxWidth?: string;
  copy?: boolean;
  onCopy?: () => void;
}

export function SecretCopier({ secrets, className, maxHeight, maxWidth, copy, onCopy }: SecretCopierProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [format, setFormat] = useState<Format>(formats.DOTENV);

  // Simple dark mode detection
  const isDarkMode = window?.matchMedia?.("(prefers-color-scheme: dark)").matches;

  const renderSecrets = () => {
    switch (format) {
      case formats.JSON:
        return JSON.stringify(secrets, null, 2);
      case formats.YAML:
        return toYAML(secrets);
      case formats.TABLE:
        return (
          <table className="w-full">
            <thead>
              <tr>
                <th>Env Var</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(secrets).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <CopyToClipboard text={key} /> {key}
                  </td>
                  <td>
                    <CopyToClipboard text={value} /> {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case formats.CLI:
        return toCliEnv(secrets);
      default:
        return toDotEnv(secrets);
    }
  };

  return (
    <div data-slot="secret-copier" className={cn(className, "w-full h-fit relative")}>
      <div className="mb-2 justify-right flex flex-row items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
              <span>{format}</span>
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setFormat(formats.DOTENV)}>{formats.DOTENV}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFormat(formats.CLI)}>{formats.CLI}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFormat(formats.JSON)}>{formats.JSON}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFormat(formats.YAML)}>{formats.YAML}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFormat(formats.TABLE)}>{formats.TABLE}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => textareaRef.current?.focus()}
        onClick={() => {
          textareaRef.current?.focus();
          onCopy?.();
        }}
        className="relative flex bg-muted rounded-lg"
      >
        {format === formats.TABLE ? (
          renderSecrets()
        ) : (
          <SyntaxHighlighter
            language="text"
            style={isDarkMode ? anOldHope : atomOneLight}
            wrapLines={false}
            lineProps={{
              style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
            }}
            customStyle={{
              cursor: "default",
              borderRadius: "0.5rem",
              maxHeight: maxHeight,
              maxWidth: maxWidth,
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "0.75rem",
              lineHeight: "1rem",
              padding: "0.5rem",
              flex: "1",
              background: "transparent",
            }}
          >
            {renderSecrets() as string}
          </SyntaxHighlighter>
        )}
      </div>
      {copy && format !== formats.TABLE && (
        <CopyToClipboard text={renderSecrets() as string} withText onCopy={onCopy} />
      )}
    </div>
  );
}

function toDotEnv(s: Secrets) {
  return Object.entries(s)
    .map(([key, value]) => `${key}="${value}"`)
    .join("\n");
}

function toCliEnv(s: Secrets) {
  return Object.entries(s)
    .map(([key, value]) => `export ${key}="${value}"`)
    .join("\n");
}

function toYAML(s: Secrets) {
  return Object.entries(s)
    .map(([key, value]) => `${key}:"${value}"`)
    .join("\n");
}
