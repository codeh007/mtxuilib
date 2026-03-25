"use client";

import { Badge } from "../ui/badge";

// type UserRole = "ADMIN" | "USER";

interface RoleBadgeProps {
  role: string;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "管理员";
      case "USER":
        return "普通用户";
      default:
        return role;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "secondary" as const;
      case "USER":
        return "outline" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <Badge variant={getRoleBadgeVariant(role)} className={className}>
      {getRoleDisplayName(role)}
    </Badge>
  );
}
