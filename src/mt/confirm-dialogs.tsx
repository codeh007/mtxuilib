"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import React, { createContext, type ReactNode, useContext, useMemo } from "react";
import { createStore, type StateCreator, useStore } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useMediaQuery } from "../hooks/use-mobile";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";

/*
  确认对话框上下文
*/

interface ConfirmOptions {
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface ConfirmState {
  open: boolean;
  loading: boolean;
  options: ConfirmOptions;
  show: (message: string, options?: Partial<ConfirmOptions>) => void;
  hide: () => void;
  setLoading: (loading: boolean) => void;
}

const createConfirmSlice: StateCreator<ConfirmState, [], [], ConfirmState> = (set, _get) => ({
  open: false,
  loading: false,
  options: {},
  show: (message: string, options: Partial<ConfirmOptions> = {}) => {
    set({
      open: true,
      loading: false,
      options: {
        title: "确认操作",
        description: message,
        confirmText: "确认",
        cancelText: "取消",
        variant: "default",
        ...options,
      },
    });
  },
  hide: () => {
    set({ open: false, loading: false });
  },
  setLoading: (loading: boolean) => {
    set({ loading });
  },
});

type ConfirmStore = ReturnType<typeof createConfirmStore>;

const createConfirmStore = () => {
  return createStore<ConfirmState>()(
    subscribeWithSelector(
      devtools(immer(createConfirmSlice), {
        name: "Confirm-store",
      }),
    ),
  );
};

const ConfirmContext = createContext<ConfirmStore | null>(null);

type ConfirmProviderProps = React.PropsWithChildren<{}>;

export const ConfirmProvider = (props: ConfirmProviderProps) => {
  const { children } = props;
  const store = useMemo(() => createConfirmStore(), []);

  return (
    <ConfirmContext.Provider value={store}>
      {children}
      <ConfirmDialog />
    </ConfirmContext.Provider>
  );
};

export function useConfirm(): ConfirmState {
  const store = useContext(ConfirmContext);
  if (!store) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return useStore(store) as ConfirmState;
}

// 便捷的 hook，返回 show 方法和其他常用状态
export function useConfirmDialog() {
  const state = useConfirm();
  const { show, hide, loading, setLoading } = state;

  return {
    show: (message: string, options?: Partial<ConfirmOptions>) => {
      return new Promise<boolean>((resolve) => {
        show(message, {
          ...options,
          onConfirm: async () => {
            if (options?.onConfirm) {
              setLoading(true);
              try {
                await options.onConfirm();
                resolve(true);
              } catch (error) {
                console.error("Confirm action failed:", error);
                resolve(false);
              } finally {
                setLoading(false);
              }
            } else {
              resolve(true);
            }
            hide();
          },
          onCancel: () => {
            if (options?.onCancel) {
              options.onCancel();
            }
            resolve(false);
            hide();
          },
        });
      });
    },
    loading,
    hide,
  };
}

interface DeleteConfirmDialogProps {
  children?: ReactNode;
  title?: string;
  description?: ReactNode;
  itemName?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function DeleteConfirmDialog({
  children,
  title,
  description,
  itemName,
  onConfirm,
  onCancel,
  loading = false,
  disabled = false,
}: DeleteConfirmDialogProps) {
  const confirmDialog = useConfirmDialog();

  const defaultTitle = title || (itemName ? `删除${itemName}` : "确认删除");
  const defaultDescription =
    typeof description === "string"
      ? description
      : itemName
        ? `您确定要删除"${itemName}"吗？此操作无法撤销。`
        : "您确定要删除此项吗？此操作无法撤销。";

  const handleClick = () => {
    confirmDialog.show(defaultDescription, {
      title: defaultTitle,
      confirmText: "删除",
      cancelText: "取消",
      variant: "destructive",
      onConfirm: async () => {
        if (onConfirm && !disabled) {
          await onConfirm();
        }
      },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        }
      },
    });
  };

  if (!children) {
    return null;
  }

  // Clone the children and add onClick handler
  return React.cloneElement(children as React.ReactElement<any>, {
    onClick: handleClick,
    disabled: disabled || loading || confirmDialog.loading,
  });
}

const ConfirmDialog = () => {
  const { open, loading, options, hide } = useConfirm();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleConfirm = async () => {
    if (options.onConfirm && !loading) {
      try {
        await options.onConfirm();
      } catch (error) {
        console.error("Confirm action failed:", error);
      }
    }
  };

  const handleCancel = () => {
    if (options.onCancel) {
      options.onCancel();
    }
    hide();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !loading) {
      hide();
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-left">{options.title || "确认操作"}</DialogTitle>
            {options.description && <DialogDescription className="text-left">{options.description}</DialogDescription>}
          </DialogHeader>
          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={handleCancel} disabled={loading} className="mt-2 sm:mt-0">
              {options.cancelText || "取消"}
            </Button>
            <Button variant={options.variant || "default"} onClick={handleConfirm} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {options.confirmText || "确认"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{options.title || "确认操作"}</DrawerTitle>
          {options.description && <DrawerDescription>{options.description}</DrawerDescription>}
        </DrawerHeader>
        <div className="px-4 pb-4">
          {options.variant === "destructive" && (
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
              <div className="text-sm text-muted-foreground">此操作无法撤销</div>
            </div>
          )}
        </div>
        <DrawerFooter className="pt-2">
          <div className="flex gap-2">
            <Button
              variant={options.variant || "default"}
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {options.confirmText || "确认"}
            </Button>
            <Button variant="outline" onClick={handleCancel} disabled={loading} className="flex-1">
              {options.cancelText || "取消"}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
