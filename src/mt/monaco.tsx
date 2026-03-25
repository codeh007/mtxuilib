import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { type RefObject, useState } from "react";
import { cn } from "../lib/utils";

export const MonacoEditor = ({
  value,
  editorRef,
  language,
  onChange,
  minimap = true,
  className,
}: {
  value: string;
  onChange?: (value: string) => void;
  editorRef: RefObject<editor.IStandaloneCodeEditor | null>;
  language: string;
  minimap?: boolean;
  className?: string;
}) => {
  const [_isEditorReady, setIsEditorReady] = useState(false);
  const onEditorDidMount = (editor: editor.IStandaloneCodeEditor, _monaco: typeof import("monaco-editor")) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };
  return (
    <div data-slot="monaco-editor" className={cn("h-full rounded", className)}>
      <Editor
        height="100%"
        className="h-full rounded"
        defaultLanguage={language}
        defaultValue={value}
        value={value}
        onChange={(value: string | undefined) => {
          if (onChange && value) {
            onChange(value);
          }
        }}
        onMount={onEditorDidMount}
        theme="vs-dark"
        options={{
          wordWrap: "on",
          wrappingIndent: "indent",
          wrappingStrategy: "advanced",
          minimap: {
            enabled: minimap,
          },
        }}
      />
    </div>
  );
};
