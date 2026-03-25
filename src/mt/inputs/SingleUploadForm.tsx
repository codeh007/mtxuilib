"use client";

import { Upload, X } from "lucide-react";
import { type ChangeEvent, type MouseEvent, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../ui/button";

interface SingleFileUploadFormProps {
  className?: string;
  onUpload?: (file: File) => Promise<void>;
}

export function SingleFileUploadForm({ className, onUpload }: SingleFileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const onUploadFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      if (onUpload) {
        await onUpload(file);
      } else {
        const formData = new FormData();
        formData.append("media", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const {
          data,
          error,
        }: {
          data: {
            url: string | string[];
          } | null;
          error: string | null;
        } = await res.json();

        if (error || !data) {
          alert(error || "Sorry! something went wrong.");
          return;
        }
      }

      // 文件上传成功，继续处理
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };

  return (
    <form
      data-slot="single-file-upload-form"
      className={cn("w-full border border-dashed border-border p-3 rounded-lg", className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-1.5 md:flex-row md:py-4">
        <div className="grow">
          {previewUrl ? (
            <div className="mx-auto w-80">
              {/* biome-ignore lint/performance/noImgElement: intentional use of img for preview */}
              <img alt="file uploader preview" className="object-cover rounded-md w-80 h-[218px]" src={previewUrl} />
            </div>
          ) : (
            <label className="flex h-full cursor-pointer flex-col items-center justify-center py-3 transition-colors duration-150 hover:text-muted-foreground">
              <Upload className="h-14 w-14 text-muted-foreground" />
              <strong className="text-sm font-medium">选择图片</strong>
              <input className="block h-0 w-0" name="file" type="file" accept="image/*" onChange={onFileUploadChange} />
            </label>
          )}
        </div>
        <div className="mt-4 flex justify-center gap-1.5 md:mt-0 md:flex-col">
          <Button
            type="button"
            variant="outline"
            disabled={!previewUrl}
            onClick={onCancelFile}
            className="w-1/2 md:w-auto"
          >
            <X className="mr-2 h-4 w-4" />
            取消
          </Button>
          <Button type="button" disabled={!previewUrl} onClick={onUploadFile} className="w-1/2 md:w-auto">
            <Upload className="mr-2 h-4 w-4" />
            上传
          </Button>
        </div>
      </div>
    </form>
  );
}
