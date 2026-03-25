"use client";

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type * as React from "react";
import { cn } from "../lib/utils";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "../ui/pagination";

interface ListPaginationProps extends React.HTMLAttributes<HTMLElement> {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function ListPagination({
  itemCount,
  pageSize,
  currentPage,
  onPageChange,
  isLoading = false,
  className,
  ...props
}: ListPaginationProps) {
  const totalPages = Math.ceil(itemCount / pageSize);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, itemCount);

  const handlePrevious = () => {
    if (hasPrevious && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      data-slot="list-pagination"
      className={cn("flex items-center justify-between border-t bg-background px-0 py-3", className)}
      aria-label="Pagination"
      {...props}
    >
      <div className="block">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startItem}</span> to <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{itemCount}</span> results
        </p>
      </div>

      <UIPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={cn(!hasPrevious && "pointer-events-none opacity-50", isLoading && "pointer-events-none")}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronLeft className="h-4 w-4" />}
              <span className="hidden sm:block">Previous</span>
            </PaginationPrevious>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={cn(!hasNext && "pointer-events-none opacity-50", isLoading && "pointer-events-none")}
            >
              <span className="hidden sm:block">Next</span>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronRight className="h-4 w-4" />}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </UIPagination>
    </nav>
  );
}
