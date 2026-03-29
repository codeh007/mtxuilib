// 'use client'

import dynamic from "next/dynamic";
import { DocumentSkeleton } from "../mt/skeletons";

const MarkDownLoading = () => {
	return <DocumentSkeleton></DocumentSkeleton>;
};

export const MarkdownLazy = dynamic(
	() => import("./markdown").then((x) => x.Markdown),
	{
		loading: MarkDownLoading,
		ssr: false,
	},
);
