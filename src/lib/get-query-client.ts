"use client";
import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnMount: false,
        // refetchOnWindowFocus: false,
        // refetchOnReconnect: false, // 修复：避免网络重连时自动重新请求
        // 智能重试策略：对认证错误不重试
        // retry: (failureCount, error) => {
        //   const errorWithStatus = error as { response?: { status?: number }; status?: number };
        //   const isAuthError =
        //     errorWithStatus?.response?.status === 403 ||
        //     errorWithStatus?.response?.status === 401 ||
        //     errorWithStatus?.status === 403 ||
        //     errorWithStatus?.status === 401;

        //   if (isAuthError) return false;

        //   // 其他错误最多重试1次
        //   return failureCount < 1;
        // },
        retryDelay: 1000,
      },
      // dehydrate: {
      //   // include pending queries in dehydration
      //   shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      // },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();

  return browserQueryClient;
}
