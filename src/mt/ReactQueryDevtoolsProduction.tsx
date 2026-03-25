import type { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/modern/production.js";
import { lazy } from "react";

export const ReactQueryDevtoolsProduction: typeof ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then((d) => ({
    default: d.ReactQueryDevtools,
  })),
) as typeof ReactQueryDevtools;
