"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui";

export function ImageUpload({
  value,
  onUploaded,
  accept = "image/*",
  label = "Upload image",
  className,
}: {
  value: string;
  onUploaded: (url: string) => void;
  accept?: string;
  label?: string;
  className?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onUploaded(data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {value ? (
        <div
          className={`a-image-preview ${className ?? "h-24 w-24"}`}
          style={{ height: className ? undefined : "96px", width: className ? undefined : "96px" }}
        >
          <Image src={value} alt="" fill sizes="200px" className="object-cover" />
        </div>
      ) : (
        <div
          className={`a-image-empty ${className ?? ""}`}
          style={
            className
              ? undefined
              : { height: "96px", width: "96px" }
          }
        >
          <span style={{ fontSize: "12px" }}>No image</span>
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <Button variant="ghost" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? "Uploading…" : label}
        </Button>
        {error ? <p className="a-upload-error">{error}</p> : null}
      </div>
    </div>
  );
}