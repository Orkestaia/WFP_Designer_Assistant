"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useCallback } from "react";

interface ImageUploadProps {
    onImageUpload: (file: File) => void;
    currentImage: File | null;
    onClear: () => void;
}

export default function ImageUpload({ onImageUpload, currentImage, onClear }: ImageUploadProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': []
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    if (currentImage) {
        return (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary/50 group">
                <Image
                    src={URL.createObjectURL(currentImage)}
                    alt="Uploaded preview"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        onClick={onClear}
                        className="bg-red-500/80 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                    >
                        <X className="w-4 h-4" /> Change Photo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={clsx(
                "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[200px]",
                isDragActive
                    ? "border-primary bg-primary/10 scale-[1.02]"
                    : "border-white/10 hover:border-primary/50 hover:bg-white/5"
            )}
        >
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-primary">
                <UploadCloud className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-white mb-2">
                {isDragActive ? "Drop your photo here..." : "Upload a photo of your space"}
            </p>
            <p className="text-sm text-muted">
                Drag & drop or click to browse (JPG, PNG, WebP up to 10MB)
            </p>
        </div>
    );
}
