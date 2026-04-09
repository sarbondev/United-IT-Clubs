import { useState } from "react";
import { Image as ImageIcon, X } from "@phosphor-icons/react";

function FileUpload({
  label,
  accept = "image/*",
  multiple = false,
  files = [],
  onFilesChange,
  onUpload,
  onRemove,
  uploading = false,
  className = "",
  preview = true,
  maxFiles = 10,
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    if (onUpload) {
      onUpload(fileList);
    }
    if (onFilesChange) {
      onFilesChange(Array.from(fileList));
    }
  };

  const handleRemove = (index) => {
    if (onRemove) {
      onRemove(index);
    }
  };

  const getPreviewSrc = (file) => {
    if (typeof file === "string") {
      return file;
    }

    if (file instanceof Blob) {
      return URL.createObjectURL(file);
    }

    return null;
  };

  return (
    <div className={className}>
      {label && <label className="form-label">{label}</label>}

      <div
        className={`relative rounded-[28px] border-2 border-dashed p-8 text-center transition-all duration-200 ${
          dragActive
            ? "border-primary-500 bg-primary-50/80"
            : "border-slate-300/80 bg-white/70 hover:border-primary-400 hover:bg-white"
        } ${uploading ? "pointer-events-none opacity-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          id="file-upload-input"
          disabled={uploading}
        />
        <label
          htmlFor="file-upload-input"
          className="flex flex-col items-center cursor-pointer"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent"></div>
          ) : (
            <>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
                <ImageIcon size={28} />
              </div>
              <p className="mb-1 text-sm font-semibold text-slate-800">
                Fayllarni yuklash uchun bosing yoki suring
              </p>
              <p className="text-xs leading-6 text-slate-500">
                PNG, JPG, GIF, WEBP (Maksimal 10MB)
              </p>
            </>
          )}
        </label>
      </div>

      {preview && files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => {
            const previewSrc = getPreviewSrc(file);
            const isImage =
              typeof file === "string" ||
              (file instanceof Blob && file.type?.startsWith("image/"));

            return (
            <div key={index} className="group relative">
              <div className="aspect-video overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100">
                {isImage && previewSrc ? (
                  <img
                    src={previewSrc}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-danger-500 text-white opacity-0 shadow-md transition-all group-hover:opacity-100"
              >
                <X size={14} weight="bold" />
              </button>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
