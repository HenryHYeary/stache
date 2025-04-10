"use client";

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface FileUploaderProps {
  ownerId: string,
  accountId: string,
  className?: string
}

const FileUploader = ({ ownerId, accountId, className }: FileUploaderProps) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="cursor-pointer">
    <input {...getInputProps()} />
    <Button type="button" className={cn("uploader-button", className)}>
      <Image src="/assets/icons/upload.svg" alt="upload" width={24} height={24} />
    </Button>
    {
      isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to select files</p>
    }
  </div>
  )
}

export default FileUploader;
