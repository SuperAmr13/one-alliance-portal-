"use client";

import type { Dispatch, SetStateAction } from "react";

type WallImageUploadProps = {
  wallImage: File | null;

  setWallImage: Dispatch<SetStateAction<File | null>>;

  wallPreview: string;

  setWallPreview: Dispatch<SetStateAction<string>>;

  errors: Record<string, string>;
};

export default function WallImageUpload({
  wallImage,
  setWallImage,
  wallPreview,
  setWallPreview,
  errors,
}: WallImageUploadProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-200">
        Wall Screenshot
      </label>

      <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-blue-700 bg-[#111933] p-6 transition hover:border-blue-500 hover:bg-[#18234a]">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;

            setWallImage(file);

            if (file) {
              setWallPreview(URL.createObjectURL(file));
            } else {
              setWallPreview("");
            }
          }}
        />

        <span className="font-semibold text-blue-300">
          {wallImage ? wallImage.name : "📤 Upload Wall Screenshot"}
        </span>
      </label>

      {wallPreview && (
        <img
          src={wallPreview}
          alt="Wall Preview"
          className="mt-4 w-full rounded-xl border border-blue-800"
        />
      )}

      {errors.wallImage && (
        <p className="mt-2 text-sm text-red-400">
          {errors.wallImage}
        </p>
      )}
    </div>
  );
}