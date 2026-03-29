import type { PropsWithChildren, ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";

interface SbRpcFormPProps {
	title?: ReactNode;
	description?: ReactNode;
}
export const SbRpcForm = (props: PropsWithChildren<SbRpcFormPProps>) => {
	return (
		<Dialog>
			<DialogTrigger></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{props.title && <DialogTitle>{props.title}</DialogTitle>}
					{props.description && (
						<DialogDescription>{props.description}</DialogDescription>
					)}
					{props.children}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
