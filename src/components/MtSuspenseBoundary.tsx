"use client";

import { type PropsWithChildren, type ReactNode, Suspense } from "react";
import type { FallbackProps } from "react-error-boundary";
import { InlineLoading } from "../mt/skeletons";

interface MtSuspenseBoundaryProps {
  suspenseFallback?: ReactNode;
  errorFallbackRender?: (props: FallbackProps) => ReactNode;
}

/**
 * Suspense 边界
 * @param props
 * @returns
 */
export const MtSuspenseBoundary = (props: PropsWithChildren<MtSuspenseBoundaryProps>) => {
  return <Suspense fallback={props.suspenseFallback || <InlineLoading />}>{props.children}</Suspense>;
};
