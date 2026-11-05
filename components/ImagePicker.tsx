"use client";

import { useEffect, useState, type ChangeEvent } from "react";

type ImagePickerProps = {
  id: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
  description?: string;
  maxFileSizeMB?: number;
};

export function ImagePicker({
  id,
  value,
  onChange,
  label = "Image",
  description = "Upload an image or paste an image URL. Uploads are stored locally in your browser.",
  maxFileSizeMB = 1,
}: ImagePickerProps) {
  const [urlInput, setUrlInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const maxBytes = maxFileSizeMB * 1024 * 1024;

  useEffect(() => {
    if (!value) {
      setUrlInput("");
      setFileName("");
      return;
    }

    if (value.startsWith("data:")) {
      setUrlInput("");
      setFileName("Uploaded image");
      return;
    }

    setUrlInput(value);
    setFileName("Linked image");
  }, [value]);

  function handleUrlChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setUrlInput(next);
    setFileName(next ? "Linked image" : "");
    setError("");
    onChange(next.trim() || undefined);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > maxBytes) {
      setError(`Please choose an image smaller than ${maxFileSizeMB} MB.`);
      return;
    }

    setError("");
    setBusy(true);
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
        setFileName(file.name);
      } else {
        setError("The selected file could not be read.");
      }
      setBusy(false);
    };

    reader.onerror = () => {
      setError("The selected file could not be read.");
      setBusy(false);
    };

    reader.readAsDataURL(file);
  }

  function clearImage() {
    onChange(undefined);
    setUrlInput("");
    setFileName("");
    setError("");
  }

  return (
    <div className="rounded-[3px] border border-ink/20 bg-white/45 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">
          {label}
        </p>
        {value ? (
          <button
            type="button"
            onClick={clearImage}
            className="text-[10px] font-bold uppercase tracking-[0.14em] text-coral underline decoration-2 underline-offset-4"
          >
            Remove image
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.15fr]">
        <div className="relative flex min-h-40 items-center justify-center overflow-hidden rounded-[2px] border border-dashed border-ink/30 bg-paper">
          {value ? (
            // User-supplied data URLs and external URLs bypass next/image domain configuration.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Selected cover preview"
              className="h-full min-h-40 w-full object-cover"
            />
          ) : (
            <div className="p-5 text-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="mx-auto h-8 w-8 text-ink/35"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="m4 17 5-5 4 4 3-3 4 4" />
              </svg>
              <p className="mt-2 text-xs text-ink/45">Image preview</p>
            </div>
          )}
          {busy ? (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/60 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              Reading image…
            </div>
          ) : null}
          <span className="absolute bottom-2 left-2 rounded-full bg-paper/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/60 backdrop-blur">
            Preview
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor={`${id}-file`}
              className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50"
            >
              Upload from device
            </label>
            <input
              id={`${id}-file`}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-[2px] border border-ink/20 bg-paper px-3 py-2.5 text-xs text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-3 file:py-2 file:text-[9px] file:font-bold file:uppercase file:tracking-[0.12em] file:text-paper"
            />
          </div>
          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-ink/35">
            <span className="h-px flex-1 bg-ink/15" />
            or
            <span className="h-px flex-1 bg-ink/15" />
          </div>
          <div>
            <label
              htmlFor={`${id}-url`}
              className="mb-2 block text-[9px] font-bold uppercase tracking-[0.16em] text-ink/50"
            >
              Paste an image URL
            </label>
            <input
              id={`${id}-url`}
              type="text"
              value={urlInput}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-[2px] border border-ink/20 bg-paper px-3 py-2.5 text-xs outline-none transition-colors placeholder:text-ink/35 focus:border-cobalt"
            />
          </div>
          {fileName ? (
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-cobalt">
              {fileName}
            </p>
          ) : null}
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-xs font-semibold text-coral">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-xs leading-relaxed text-ink/50">{description}</p>
      )}
    </div>
  );
}
