import type { UIMessage } from "ai";

// Define types for our chat system
type ChatMessage = UIMessage;

import { type ClassValue, clsx } from "clsx";
import { formatISO } from "date-fns";
// import { isNumber, isString } from "lodash";
import { twMerge } from "tailwind-merge";

// 简单的错误类型定义
export type ErrorCode = string;

export class ChatSDKError extends Error {
  public code: ErrorCode;

  constructor(code: ErrorCode, cause?: string) {
    super(cause || `Error: ${code}`);
    this.code = code;
    this.name = "ChatSDKError";
    if (cause) {
      this.cause = cause;
    }
  }
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newUniqueId() {
  return randomString(10);
}

const uuidByteToHex = Array.from({ length: 256 }, (_, index) => index.toString(16).padStart(2, "0"));

function formatUuidFromBytes(bytes: Uint8Array) {
  return (
    `${uuidByteToHex[bytes[0]]}${uuidByteToHex[bytes[1]]}${uuidByteToHex[bytes[2]]}${uuidByteToHex[bytes[3]]}` +
    `-${uuidByteToHex[bytes[4]]}${uuidByteToHex[bytes[5]]}` +
    `-${uuidByteToHex[bytes[6]]}${uuidByteToHex[bytes[7]]}` +
    `-${uuidByteToHex[bytes[8]]}${uuidByteToHex[bytes[9]]}` +
    `-${uuidByteToHex[bytes[10]]}${uuidByteToHex[bytes[11]]}${uuidByteToHex[bytes[12]]}${uuidByteToHex[bytes[13]]}${uuidByteToHex[bytes[14]]}${uuidByteToHex[bytes[15]]}`
  );
}

export function randomUUID() {
  const cryptoApi = globalThis.crypto as (Crypto & { randomUUID?: () => string }) | undefined;

  if (cryptoApi?.randomUUID) {
    return cryptoApi.randomUUID();
  }

  const bytes = new Uint8Array(16);

  if (cryptoApi?.getRandomValues) {
    cryptoApi.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index++) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return formatUuidFromBytes(bytes);
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
export const getCreatedAfterFromTimeRange = (timeRange?: string) => {
  switch (timeRange) {
    case "1h":
      return new Date(Date.now() - 60 * 60 * 1000).toISOString();
    case "6h":
      return new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
    case "1d":
      return new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    case "7d":
      return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  }
};

// dateUtils.ts
export function getRelativeTimeString(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "just now";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  }

  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}
// 生成随机字符串，支持不同字符集
export const randomString = (length: number) =>
  [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");

// 生成更安全的随机字符串（排除易混淆字符）
export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // 排除易混淆字符 Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatDollars(input: number): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  }).format(input);
  return formatted;
}

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function cleanSearchParams(urlSearchParams: URLSearchParams) {
  const cleanedParams = urlSearchParams;
  const keysForDel: string[] = [];

  urlSearchParams.forEach((value, key) => {
    if (value === "null" || value === "undefined" || !value) {
      keysForDel.push(key);
    }
  });

  keysForDel.forEach((key) => {
    cleanedParams.delete(key);
  });

  return cleanedParams;
}

export function searchString(page: string, search: string, sort: string): string {
  const searchParameters = new URLSearchParams({
    page,
    search,
    sort,
  });

  return cleanSearchParams(searchParameters)?.toString();
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const delay = sleep;
export function browserDownload(content: Blob | string, filename: string) {
  let blobContent = content;
  if (typeof content === "string") {
    blobContent = new Blob([content], {
      type: "text/plain",
    });
  }
  const url = URL.createObjectURL(blobContent as Blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.addEventListener("click", clickHandler, false);
  a.click();
  return a;
}

export async function ReadFileBase64Str(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject("read file string abort");
    reader.onerror = (error) => reject(error);
    reader.onload = () => {
      resolve(window.btoa(reader.result as string));
    };
    reader.readAsBinaryString(file);
  });
}
export async function ReadFileStr(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject("read file string abort");
    reader.onerror = (error) => reject(error);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsText(file, "utf-8");
  });
}

export const DataFormat = (date: number) => {
  const _date = new Date(date); // yyyy-MM-dd
  return `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`;
};
export const DataFormatWithSeconds = (date: number) => {
  const _date = new Date(date); // yyyy-MM-dd
  return `${_date.getFullYear()}-${
    _date.getMonth() + 1
  }-${_date.getDate()}-${_date.getHours()}-${_date.getMinutes()}-${_date.getSeconds()}`;
};

export const isEdgeRuntime = () => {
  //@ts-expect-error
  return typeof EdgeRuntime === "string";
};

export const convertToArray = <T>(maybeArray: T | T[]): T[] => {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
};

export const splitMethodsParts = (methodName: string) => {
  /**
   * 这段代码首先使用正则表达式 /(?=[A-Z])/ 将字符串分割为多个部分，该正则表达式表示在大写字母之前进行分割。
   * 然后，使用 map 方法将分割得到的部分转换为小写形式。
   * 输入："CxConfigList" 可得到 ["cx", "config", "list"]。
   */
  const parts = methodName.split(/(?=[A-Z])/).map((part) => part.toLowerCase());
  return parts;
};

export function transUrlLink(url: string) {
  try {
    const uri = new URL(url);
    if (uri.host === "localhost") {
      return `${uri.pathname}?${uri.searchParams.toString()}`;
    }
    return url;
  } catch (_e) {}
  return url;
}

export const isJsonResponse = (res: Response) => {
  const contentType = res.headers.get("Content-Type");
  return !!contentType?.includes("json");
};

export function humanize(input: string): string {
  return input.replace(/[-_.]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

export function stringsRemovePrefix(inputString: string, prefix: string) {
  if (inputString.startsWith(prefix)) {
    return inputString.substring(prefix.length);
  }
  return inputString;
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export enum ResultCode {
  InvalidCredentials = "INVALID_CREDENTIALS",
  InvalidSubmission = "INVALID_SUBMISSION",
  UserAlreadyExists = "USER_ALREADY_EXISTS",
  UnknownError = "UNKNOWN_ERROR",
  UserCreated = "USER_CREATED",
  UserLoggedIn = "USER_LOGGED_IN",
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return "Invalid credentials!";
    case ResultCode.InvalidSubmission:
      return "Invalid submission, please try again!";
    case ResultCode.UserAlreadyExists:
      return "User already exists, please log in!";
    case ResultCode.UserCreated:
      return "User created, welcome!";
    case ResultCode.UnknownError:
      return "Something went wrong, please try again!";
    case ResultCode.UserLoggedIn:
      return "Logged in!";
  }
};

/**
 * 将 JSON 字符串复制到剪切板
 * @param {string} jsonStr - 要复制的 JSON 字符串
 */

export const copyClipboard = (obj: unknown) => {
  if (typeof obj === "object") {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    return;
  }
  navigator.clipboard.writeText(obj as string);
};

export function isObject(object: unknown) {
  return object != null && typeof object === "object";
}

export function deepEqual(object1: Record<string, unknown>, object2: Record<string, unknown>) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export const httpUrlToWsUrl = (url: string) => {
  return url.replace(/^http:\/\//, "ws://").replace(/^https:\/\//, "wss://");
};

export function relativeDate(date?: string | number) {
  if (!date) {
    return "N/A";
  }

  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "auto", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
  });

  const time = timeFrom(date);
  if (!time) {
    return "N/A";
  }

  let value = time.time;

  if (time.when === "past") {
    value = -value;
  }

  return capitalize(rtf.format(value, time.unitOfTime));
}

export function timeFrom(time: string | number, secondTime?: string | number) {
  // Get timestamps
  const unixTime = new Date(time).getTime();
  if (!unixTime) {
    return;
  }

  let now = Date.now();

  if (secondTime) {
    now = new Date(secondTime).getTime();
  }

  // Calculate difference
  let difference = unixTime / 1000 - now / 1000;

  const tfn: {
    when: "past" | "now" | "future";
    unitOfTime: Intl.RelativeTimeFormatUnit;
    time: number;
  } = {
    when: "now",
    unitOfTime: "seconds",
    time: 0,
  };

  // Check if time is in the past, present, or future
  if (difference > 0) {
    tfn.when = "future";
  } else if (difference < -1) {
    tfn.when = "past";
  }

  // Convert difference to absolute
  difference = Math.abs(difference);

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    tfn.unitOfTime = "years";
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    tfn.unitOfTime = "months";
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.unitOfTime = "days";
    tfn.time = Math.floor(difference / (60 * 60 * 24));
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.unitOfTime = "hours";
    tfn.time = Math.floor(difference / (60 * 60));
  } else if (difference / 60 > 1) {
    // Minutes
    tfn.unitOfTime = "minutes";
    tfn.time = Math.floor(difference / 60);
  } else {
    // Seconds
    tfn.unitOfTime = "seconds";
    tfn.time = Math.floor(difference);
  }

  return tfn;
}

export function formatDuration(ms: number): string {
  if (ms < 0) {
    return "0s";
  }

  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }
  if (ms < 3600000) {
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  }
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}
export function timeBetween(start: string | number, end: string | number) {
  const startUnixTime = new Date(start).getTime();
  const endUnixTime = new Date(end).getTime();

  if (!startUnixTime || !endUnixTime) {
    return;
  }

  // Calculate difference
  const difference = endUnixTime - startUnixTime;

  return formatDuration(difference);
}

export async function copyText(text: string): Promise<void> {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(text);
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textArea);
  if (success) {
    return Promise.resolve();
  }
  return Promise.reject();
}

export function basicTimeFormat(time: string): string {
  const date = new Date(time);
  const dateString = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-US");
  return `${dateString} at ${timeString}`;
}

export function timeFormatWithShortDate(time: string): string {
  const date = new Date(time);
  const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  const timeString = date.toLocaleTimeString("en-US");
  return `${dateString} at ${timeString}`;
}

export function stripIndents(value: string): string;
export function stripIndents(strings: TemplateStringsArray, ...values: unknown[]): string;

export function stripIndents(arg0: string | TemplateStringsArray, ...values: unknown[]) {
  if (typeof arg0 !== "string") {
    const processedString = arg0.reduce((acc, curr, i) => {
      const newAcc = acc + curr + (values[i] ?? "");
      return newAcc;
    }, "");

    return _stripIndents(processedString);
  }

  return _stripIndents(arg0);
}

function _stripIndents(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trimStart()
    .replace(/[\r\n]$/, "");
}

/**
 * 用 SHA-256 计算hash值后，用 a-zA-Z的字符表示最终的值
 * @param message
 * @returns
 */
export async function sha256WithAlphabets(message: unknown) {
  const buffer =
    typeof message === "object"
      ? new TextEncoder().encode(JSON.stringify(message))
      : new TextEncoder().encode(message as string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  // 将哈希值转换为 Base64 编码
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode(...hashArray));
  // 从 Base64 编码的字符串中提取字母部分
  const alphabetsOnly = hashBase64.replace(/[^a-zA-Z]/g, "");
  return alphabetsOnly;
}

export async function defaultHash(message: unknown) {
  const hash = await sha256WithAlphabets(message);
  return hash.slice(0, 16);
}

export function setLocalStorage(name: string, value: unknown, stringify = true) {
  if (stringify) {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    localStorage.setItem(name, value as string);
  }
}

export function eraseCookie(name: string) {
  // Using traditional cookie deletion for compatibility across all browsers
  // biome-ignore lint/suspicious/noDocumentCookie: Legacy cookie deletion method for compatibility
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function truncateText(text: string, length = 50) {
  if (text.length > length) {
    return `${text.substring(0, length)} ...`;
  }
  return text;
}

export function camelToDashCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function safeJsonStringify(input: unknown): string {
  if (typeof input === "object" && input !== null) {
    return JSON.stringify(input);
  }
  return input as string;
}

export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = (await response.json()) as { code?: string; cause?: string };
    throw new ChatSDKError(errorData.code || "unknown_error", errorData.cause);
  }

  return response.json();
};

export async function fetchWithErrorHandlers(input: RequestInfo | URL, init?: RequestInit) {
  try {
    const response = await fetch(input, init);

    if (!response.ok) {
      const errorData = (await response.json()) as { code?: string; cause?: string };
      throw new ChatSDKError(errorData.code || "unknown_error", errorData.cause);
    }

    return response;
  } catch (error: unknown) {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      throw new ChatSDKError("offline:chat");
    }

    throw error;
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
  return [];
}

export function sanitizeText(text: string) {
  return text.replace("<has_function_call>", "");
}

// 简化的消息转换函数，避免复杂的类型问题
export function convertToUIMessages(messages: unknown[]): ChatMessage[] {
  return messages.map((message) => {
    const msg = message as Record<string, unknown>;
    return {
      id: String(msg.id || ""),
      role: (msg.role as "user" | "assistant" | "system") || "user",
      content: String(msg.content || ""),
      parts: Array.isArray(msg.parts) ? msg.parts : [],
      metadata: {
        createdAt: msg.createdAt ? formatISO(new Date(String(msg.createdAt))) : formatISO(new Date()),
      },
    };
  });
}

export function getTextFromMessage(_message: ChatMessage): string {
  // For now, return empty string as we need to properly handle UIMessage structure
  // This function needs to be updated based on the actual message structure used
  return "";
}

/**
 * 自动重试
 * @param fn
 * @param maxRetries
 * @param maxDuration
 * @returns
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 10,
  maxDuration: number = 120000, // 2 minutes
): Promise<T> => {
  const startTime = Date.now();
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (Date.now() - startTime > maxDuration) {
      throw new Error(`Retry timeout after ${maxDuration}ms`);
    }

    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const delay = Math.min(1000 * 2 ** attempt, 5000); // Exponential backoff, max 5s
      console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`, error);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error("All retry attempts failed");
};

/**
 * 中文相对时间函数
 * 将日期转换为中文的相对时间表示，如"刚刚"、"5分钟前"等
 */
export function getRelativeTimeStringCN(date: string | number | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "刚刚";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }
  if (diffInDays < 30) {
    return `${diffInDays}天前`;
  }
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`;
  }

  return `${diffInYears}年前`;
}

import { createId } from "@paralleldrive/cuid2";
import { generateId } from "ai";

// 使用 Web Crypto API 实现密码哈希
export async function generateHashedPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const combinedBuffer = new Uint8Array(passwordBuffer.length + salt.length);
  combinedBuffer.set(passwordBuffer);
  combinedBuffer.set(salt, passwordBuffer.length);

  const hashBuffer = await crypto.subtle.digest("SHA-256", combinedBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
  const saltBase64 = btoa(String.fromCharCode.apply(null, Array.from(salt)));
  return `${saltBase64}:${hashBase64}`;
}

// 支持两种 ID 生成方式的统一接口
export async function generateDummyPassword(useAiGenerateId = false) {
  const password = useAiGenerateId ? generateId() : createId();
  const hashedPassword = await generateHashedPassword(password);
  return hashedPassword;
}

/**
 * Check if a value is a valid ISO DateTime string
 * @param v
 * @returns
 */
export const isISODateString = (v: unknown): boolean =>
  typeof v === "string" &&
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/.test(
    v,
  );
export const ifDateGetTime = (v: unknown) => {
  if (v instanceof Date) return v.getTime();
  if (typeof v === "string") {
    const t = new Date(v).getTime();
    if (!Number.isNaN(t)) return t;
  }
  return v;
};

export const sortSearchParams = (params: URLSearchParams) =>
  new URLSearchParams(
    Array.from(params.entries()).sort((a, b) => {
      const x = `${a[0]}${a[1]}`;
      const y = `${b[0]}${b[1]}`;
      return x > y ? 1 : -1;
    }),
  );
