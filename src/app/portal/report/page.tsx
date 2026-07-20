"use client";

import { useState } from "react";

export default function ReportPage() {
  const [heroPower, setHeroPower] = useState("");
  const [firstSquadPower, setFirstSquadPower] = useState("");
  const [firstSquadType, setFirstSquadType] = useState("");

  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [wallImage, setWallImage] = useState<File | null>(null);

  const [heroPreview, setHeroPreview] = useState("");
  const [wallPreview, setWallPreview] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload/report-images", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Image upload failed.");
    }

    return data.path as string;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSuccessMessage("");

    const newErrors: Record<string, string> = {};

    if (!heroPower) {
      newErrors.heroPower = "Hero Power is required.";
    } else if (Number(heroPower) < 10000000) {
      newErrors.heroPower =
        "Hero Power must be at least 8 digits.";
    }

    if (!firstSquadPower) {
      newErrors.firstSquadPower =
        "First Squad Power is required.";
    } else if (Number(firstSquadPower) < 10000000) {
      newErrors.firstSquadPower =
        "First Squad Power must be at least 8 digits.";
    }

    if (!firstSquadType) {
      newErrors.firstSquadType =
        "Please select a Squad Type.";
    }

    if (!heroImage) {
      newErrors.heroImage =
        "Please upload the Hero Power screenshot.";
    }

    if (!wallImage) {
      newErrors.wallImage =
        "Please upload the Wall screenshot.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const heroImagePath = await uploadImage(heroImage!);
      const wallImagePath = await uploadImage(wallImage!);

      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heroPower,
          firstSquadPower,
          firstSquadType,
          heroImagePath,
          wallImagePath,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Failed to submit report."
        );
      }

      setSuccessMessage("Report submitted successfully.");

      setHeroPower("");
      setFirstSquadPower("");
      setFirstSquadType("");
      setHeroImage(null);
      setWallImage(null);

      setHeroPreview("");
      setWallPreview("");

      setErrors({});
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit report.";

      setErrors({
        submit: message,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400">
            Weekly Report
          </h1>

          <p className="mt-2 text-gray-400">
            Submit your weekly alliance report.
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-700 bg-green-950/30 p-4 text-green-300">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="mb-6 rounded-xl border border-red-700 bg-red-950/30 p-4 text-red-300">
            {errors.submit}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-blue-800 bg-[#0b1024] p-8 shadow-2xl"
        >

          <div>
            <label className="mb-2 block font-medium text-gray-200">
              Hero Power
            </label>

            <input
              type="number"
              min={10000000}
              value={heroPower}
              onChange={(e) => setHeroPower(e.target.value)}
              className="w-full rounded-xl border border-blue-800 bg-[#111933] p-3 text-white outline-none transition focus:border-blue-500"
            />

            {errors.heroPower && (
              <p className="mt-2 text-sm text-red-400">
                {errors.heroPower}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-200">
              First Squad Power
            </label>

            <input
              type="number"
              min={10000000}
              value={firstSquadPower}
              onChange={(e) =>
                setFirstSquadPower(e.target.value)
              }
              className="w-full rounded-xl border border-blue-800 bg-[#111933] p-3 text-white outline-none transition focus:border-blue-500"
            />

            {errors.firstSquadPower && (
              <p className="mt-2 text-sm text-red-400">
                {errors.firstSquadPower}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-200">
              Squad Type
            </label>

            <select
              value={firstSquadType}
              onChange={(e) =>
                setFirstSquadType(e.target.value)
              }
              className="w-full rounded-xl border border-blue-800 bg-[#111933] p-3 text-white outline-none transition focus:border-blue-500"
            >
              <option value="">Select Squad</option>
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
          <div>
            <label className="mb-2 block font-medium text-gray-200">
              Hero Power Screenshot
            </label>

            <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-blue-700 bg-[#111933] p-6 transition hover:border-blue-500 hover:bg-[#18234a]">
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
                {heroImage
                  ? heroImage.name
                  : "📤 Upload Hero Screenshot"}
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
                {wallImage
                  ? wallImage.name
                  : "📤 Upload Wall Screenshot"}
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
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white transition duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Weekly Report"}
          </button>

        </form>

      </div>
    </main>
  );
}