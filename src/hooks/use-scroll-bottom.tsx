import { useCallback, useRef } from "react";
/**
 * 用法
 * cosnt ClientComponent = ()=>{
 *     const { containerRef, scrollToBottom } = useChatScroll();
 *     return <div ref={containerRef}>
 *        long content elements.
 *        ...
 *     </div>
 * }
 */
export function useScrollBottom() {
	const containerRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = useCallback(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		container.scrollTo({
			top: container.scrollHeight,
			behavior: "smooth",
		});
	}, []);

	return { containerRef, scrollToBottom };
}
