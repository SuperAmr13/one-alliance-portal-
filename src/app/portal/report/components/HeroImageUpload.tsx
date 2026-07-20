"use client";

import type { Dispatch, SetStateAction } from "react";

type HeroImageUploadProps = {
  heroImage: File | null;

  setHeroImage: Dispatch<SetStateAction<File | null>>;

  heroPreview: string;

  setHeroPreview: Dispatch<SetStateAction<string>>;

  errors: Record<string, string>;
};

export default function HeroImageUpload({
  heroImage,
  setHeroImage,
  heroPreview,
  setHeroPreview,
  errors,
}: HeroImageUploadProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-200">
        Hero Power Screenshot
      </label>

      <label
        className={`flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed bg-[#111933] p-6 transition ${
          errors.heroImage
            ? "border-red-500 hover:border-red-400"
            : "border-blue-700 hover:border-blue-500 hover:bg-[#18234a]"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;

            setHeroImage(file);

            if (file) {
              setHeroPreview(URL.createObjectURL(file));
            } else {
              setHeroPreview("");
            }
          }}
        />

        <span className="font-semibold text-blue-300">
          {heroImage ? heroImage.name : "📤 Upload Hero Screenshot"}
        </span>
      </label>

      {heroPreview && (
        <img
          src={heroPreview}
          alt="Hero Preview"
          className="mt-4 w-full rounded-xl border border-blue-800"
        />
      )}

      {errors.heroImage && (
        <p className="mt-2 text-sm text-red-400">
          {errors.heroImage}
        </p>
      )}
    </div>
  );
}