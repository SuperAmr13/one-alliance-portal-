"use client";

import type { Dispatch, SetStateAction } from "react";

type FirstSquadPowerFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  error?: string;
};

export default function FirstSquadPowerField({
  value,
  onChange,
  error,
}: FirstSquadPowerFieldProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-gray-200">
        First Squad Power
      </label>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.replace(/\D/g, ""))
        }
        className={`w-full rounded-xl border bg-[#111933] p-3 text-white outline-none transition ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-blue-800 focus:border-blue-500"
        }`}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}