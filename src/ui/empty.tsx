import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const emptyVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    variant: {
      default: "py-12",
      compact: "py-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(emptyVariants({ variant }), className)} {...props} />
));
Empty.displayName = "Empty";

const EmptyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-4", className)} {...props} />,
);
EmptyHeader.displayName = "EmptyHeader";

const emptyMediaVariants = cva("flex items-center justify-center", {
  variants: {
    variant: {
      icon: "h-12 w-12 text-muted-foreground",
      image: "h-24 w-24",
      avatar: "h-16 w-16",
    },
  },
  defaultVariants: {
    variant: "icon",
  },
});

const EmptyMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyMediaVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(emptyMediaVariants({ variant }), className)} {...props} />
));
EmptyMedia.displayName = "EmptyMedia";

const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  ),
);
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground max-w-sm", className)} {...props} />
  ),
);
EmptyDescription.displayName = "EmptyDescription";

const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mt-6", className)} {...props} />,
);
EmptyContent.displayName = "EmptyContent";

export { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent, emptyVariants };
