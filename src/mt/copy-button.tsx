"use client";

import type { DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu";
import { Check, CheckIcon, ClipboardIcon, Copy } from "lucide-react";
import * as React from "react";

import { type Event, trackEvent } from "../lib/events";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string;
  src?: string;
  event?: Event["name"];
}

interface CopyToClipboardProps extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
  text: string;
  withText?: boolean;
  onCopy?: () => void;
  children?: React.ReactNode;
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
}

export function CopyButton({ value, className, src, variant = "ghost", event, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, []);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className,
      )}
      onClick={() => {
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event,
                properties: {
                  code: value,
                },
              }
            : undefined,
        );
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}

export function CopyToClipboard({
  text,
  className,
  withText = false,
  onCopy,
  children,
  ...props
}: CopyToClipboardProps) {
  const [successCopy, setSuccessCopy] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setSuccessCopy(true);
      onCopy?.();
      setTimeout(() => {
        setSuccessCopy(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Button
      data-slot="copy-to-clipboard"
      className={cn(
        withText ? "flex cursor-pointer flex-row items-center gap-2 mt-2" : "h-6 w-6 cursor-pointer p-0",
        className,
      )}
      variant={withText ? "default" : "ghost"}
      onClick={handleCopy}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {successCopy ? <Check className="size-4" /> : <Copy className="size-4" />}
          {withText && (successCopy ? "Copied" : "Copy to clipboard")}
        </>
      )}
    </Button>
  );
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
  value: string;
  classNames: string;
  className?: string;
}

export function CopyWithClassNames({ value, classNames, className }: CopyWithClassNamesProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, []);

  const copyToClipboard = React.useCallback((value: string) => {
    copyToClipboardWithMeta(value);
    setHasCopied(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn("relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50", className)}
        >
          {hasCopied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3" />}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyToClipboard(value)}>Component</DropdownMenuItem>
        <DropdownMenuItem onClick={() => copyToClipboard(classNames)}>Classname</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
//   commands: Required<NpmCommands>;
// }

// export function CopyNpmCommandButton({ commands, className, ...props }: CopyNpmCommandButtonProps) {
//   const [hasCopied, setHasCopied] = React.useState(false);

//   React.useEffect(() => {
//     setTimeout(() => {
//       setHasCopied(false);
//     }, 2000);
//   }, [hasCopied]);

//   const copyCommand = React.useCallback((value: string, pm: "npm" | "pnpm" | "yarn" | "bun") => {
//     copyToClipboardWithMeta(value, {
//       name: "copy_npm_command",
//       properties: {
//         command: value,
//         pm,
//       },
//     });
//     setHasCopied(true);
//   }, []);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           size="icon"
//           variant="ghost"
//           className={cn("relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50", className)}
//         >
//           {hasCopied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3" />}
//           <span className="sr-only">Copy</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => copyCommand(commands.__npmCommand__, "npm")}>npm</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => copyCommand(commands.__yarnCommand__, "yarn")}>yarn</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => copyCommand(commands.__pnpmCommand__, "pnpm")}>pnpm</DropdownMenuItem>
//         <DropdownMenuItem onClick={() => copyCommand(commands.__bunCommand__, "bun")}>bun</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
