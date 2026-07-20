"use client";

import type { Dispatch, SetStateAction } from "react";

type SquadTypeFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  errors: Record<string, string>;
};

export default function SquadTypeField({
  value,
  onChange,
  errors,
}: SquadTypeFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        First Squad Type
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-[#0B1220] p-3 outline-none transition ${
          errors.firstSquadType
            ? "border-red-500 focus:border-red-500"
            : "border-gray-700 focus:border-blue-500"
        }`}
      >
        <option value="">Select Squad Type</option>
        <option value="AIRCRAFT">Aircraft</option>
        <option value="TANKS">Tanks</option>
        <option value="MISSILES">Missiles</option>
      </select>

      {errors.firstSquadType && (
        <p className="mt-2 text-sm text-red-400">
          {errors.firstSquadType}
        </p>
      )}
    </div>
  );
}