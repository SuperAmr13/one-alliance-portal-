"use client";

import { useEffect, useRef, useState } from "react";

type SquadTypeFieldProps = {
  value: string;
  onChange: (value: string) => void;
  errors: Record<string, string>;
};

const options = [
  {
    value: "AIRCRAFT",
    label: "✈️ Aircraft",
  },
  {
    value: "TANKS",
    label: "🛡️ Tanks",
  },
  {
    value: "MISSILES",
    label: "🚀 Missiles",
  },
];

export default function SquadTypeField({
  value,
  onChange,
  errors,
}: SquadTypeFieldProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const selected =
    options.find((o) => o.value === value)?.label ??
    "Select Squad Type";

  return (
    <div ref={ref} className="relative">

      <label className="mb-2 block font-medium text-gray-200">
        First Squad Type
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#111933] p-3 text-left transition ${
          errors.firstSquadType
            ? "border-red-500"
            : "border-blue-800"
        }`}
      >
        <span>{selected}</span>

        <span
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-blue-800 bg-[#111933] shadow-2xl">

          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-blue-700/20 ${
                value === option.value
                  ? "bg-blue-600/20 text-blue-300"
                  : ""
              }`}
            >
              <span>{option.label}</span>

              {value === option.value && (
                <span>✓</span>
              )}
            </button>
          ))}

        </div>
      )}

      {errors.firstSquadType && (
        <p className="mt-2 text-sm text-red-400">
          {errors.firstSquadType}
        </p>
      )}

    </div>
  );
}