import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps, PropsWithChildren } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { Dialog, DialogContent } from "../ui/dialog";
import { Drawer, DrawerContent } from "../ui/drawer";

interface MtDialogProps extends ComponentProps<typeof Dialog> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function MtDialog(props: PropsWithChildren<MtDialogProps>) {
  const { ...restProps } = props;
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;

  if (isDesktop) {
    return <Dialog data-slot="mt-dialog" {...restProps} />;
  }

  return <Drawer data-slot="mt-dialog" {...restProps} />;
}

export function MtDialogContent(
  props: PropsWithChildren<ComponentProps<typeof DialogContent> & ComponentProps<typeof DrawerContent>>,
) {
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;

  return (
    <>
      {isDesktop && <DialogContent data-slot="mt-dialog-content" {...props} />}
      {!isDesktop && <DrawerContent data-slot="mt-dialog-content" {...props} />}
    </>
  );
}

export const MtDialogTrigger = DialogPrimitive.Trigger;
