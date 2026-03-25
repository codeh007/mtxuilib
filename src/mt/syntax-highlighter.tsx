"use client";
import { PrismAsyncLight } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";

PrismAsyncLight.registerLanguage("js", tsx);
PrismAsyncLight.registerLanguage("jsx", tsx);
PrismAsyncLight.registerLanguage("ts", tsx);
PrismAsyncLight.registerLanguage("tsx", tsx);
PrismAsyncLight.registerLanguage("python", python);

export const SyntaxHighlighter = PrismAsyncLight;
