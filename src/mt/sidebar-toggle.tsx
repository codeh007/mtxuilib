import type { ComponentProps } from "react";
import { SidebarLeftIcon } from "../icons/aichatbot.icons";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { type SidebarTrigger, useSidebar } from "../ui/sidebar";
import { BetterTooltip } from "../ui/tooltip";

export function SidebarToggle({ className }: ComponentProps<typeof SidebarTrigger>) {
  const { toggleSidebar } = useSidebar();

  return (
    <BetterTooltip content="Toggle Sidebar" align="start">
      <Button
        data-slot="sidebar-toggle"
        onClick={toggleSidebar}
        variant="outline"
        className={cn("md:px-2 md:h-fit", className)}
      >
        <SidebarLeftIcon size={16} />
      </Button>
    </BetterTooltip>
  );
}
