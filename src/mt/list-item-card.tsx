import { memo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ListItemAction {
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  title: string;
  variant?: "ghost" | "outline" | "default" | "destructive" | "secondary";
}

interface ListItemField {
  label: string;
  value: React.ReactNode;
  className?: string;
}

interface ListItemCardProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    className?: string;
  };
  fields: ListItemField[];
  actions?: ListItemAction[];
  className?: string;
}

export const ListItemCard = memo(
  ({ title, description, badge, fields, actions = [], className = "" }: ListItemCardProps) => {
    return (
      <Card className={`performance-card ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg truncate">{title}</CardTitle>
              {description && <CardDescription className="truncate">{description}</CardDescription>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {badge && <Badge className={badge.className}>{badge.text}</Badge>}
              {actions.map((action, i) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={`action-${i}-${action.title || "button"}`}
                    variant={action.variant || "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={action.onClick}
                    title={action.title}
                  >
                    <IconComponent className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {fields.map((field, i) => (
              <div key={`field-${i}-${field.label}`} className={`min-w-0 ${field.className || ""}`}>
                <span className="text-muted-foreground">{field.label}:</span>
                <div className="truncate">{field.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  },
);

ListItemCard.displayName = "ListItemCard";
