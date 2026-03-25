/**
 * 开发提示: 使用 js bind的方式,可以确保最终输出日志定位的文件和调用行号显示为调用方的行号.
 */
export const log_info = console.info.bind(console);
export const log_warn = console.warn.bind(console);
export const log_error = console.error.bind(console);
