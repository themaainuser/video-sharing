"use client";
import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import { CircleAlert } from "lucide-react";

export function Uploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const toomanyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      const fileSizetoBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (toomanyFiles) {
        toast.error("Too many files selected, max is 5");
      }

      if (fileSizetoBig) {
        toast.error("File size exceeds 10mb limit");
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
    maxFiles: 2,
    maxSize: 10 * 1024 * 1024,
    accept: {
      "video/*": [],
    },
  });

  return (
    <>
      <Toaster
        position="bottom-right"
        icons={{ error: <CircleAlert /> }}
        richColors={true}
      />
      <Card
        className={cn(
          "relative h-64 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
        )}
        {...getRootProps()}
      >
        <CardContent className="flex h-full flex-col items-center justify-center">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
              <p>Drag 'n' drop some files here, or click to select files</p>
              <Button>Upload</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
