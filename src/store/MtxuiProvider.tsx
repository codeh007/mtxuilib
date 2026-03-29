"use client";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { createContext, useContext, useMemo, useRef } from "react";

import { createStore, type StateCreator, useStore } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { ActiveThemeProvider } from "../components/active-theme";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { ThemeProvider } from "../components/themes/ThemeProvider";
import { ConfirmProvider } from "../mt/confirm-dialogs";
import { DebugProvider } from "../mt/DebugValue";
import { SonnerToaster } from "../ui/sonner";

type MtxuiProps = {};
export interface MtxuiState extends MtxuiProps {
	_hasHydrated?: boolean;
}

const createAppSlice: StateCreator<MtxuiState, [], [], MtxuiState> = (
	set,
	_get,
	init,
) => {
	return {
		...init,
		setHasHydrated: (_hasHydrated: boolean) => set({ _hasHydrated }),
	};
};

type mtappStore = ReturnType<typeof createMtxuitore>;
type MainStoreState = MtxuiState;

const createMtxuitore = (initProps?: Partial<MainStoreState>) => {
	const initialState = { ...initProps };
	return createStore<MainStoreState>()(
		subscribeWithSelector(
			devtools(
				immer((...a) => ({
					...createAppSlice(...a),
					...initialState,
				})),
				{
					name: "Mtxui-store",
				},
			),
		),
	);
};
const _context = createContext<mtappStore | null>(null);

type AppProviderProps = React.PropsWithChildren<MtxuiProps>;
export const MtxuiProvider = (props: AppProviderProps) => {
	const { children, ...etc } = props;
	const etcRef = useRef(etc);
	etcRef.current = etc;

	const mystore = useMemo(() => {
		return createMtxuitore(etcRef.current);
	}, []);

	return (
		<_context.Provider value={mystore}>
			<DebugProvider>
				<ThemeProvider>
					<TooltipProvider delayDuration={200}>
						<ConfirmProvider>
							<ActiveThemeProvider>{children}</ActiveThemeProvider>
						</ConfirmProvider>
						<TailwindIndicator />
						<SonnerToaster position="top-center" richColors closeButton />
					</TooltipProvider>
				</ThemeProvider>
			</DebugProvider>
		</_context.Provider>
	);
};

export function useMtxui(): MainStoreState {
	const store = useContext(_context);
	if (!store) throw new Error("useMtxui must be used within MtxuiProvider");
	return useStore(store);
}
