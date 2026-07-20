"use client";

import type { Dispatch, SetStateAction } from "react";

type HeroPowerFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  error?: string;
};

export default function HeroPowerField({
  value,
  onChange,
  error,
}: HeroPowerFieldProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-200">
        Hero Power
      </label>

      <input
        type="number"
        min={10000000}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-blue-800 bg-[#111933] p-3 text-white outline-none transition focus:border-blue-500"
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}