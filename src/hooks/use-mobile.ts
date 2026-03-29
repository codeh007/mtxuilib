import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		checkIsMobile();
		window.addEventListener("resize", checkIsMobile);
		return () => window.removeEventListener("resize", checkIsMobile);
	}, []);

	return isMobile;
}

export function useMediaQuery(query: string) {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const handler = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, [query]);

	return matches;
}
