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
        Total Hero Power
      </label>

    <input
      type="text"
        inputMode="numeric"
          value={value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "").replace(/\D/g, "");
                    onChange(raw);
                      }}
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