"use client";

import { useState } from "react";

export default function ReportPage() {
  const [heroPower, setHeroPower] = useState("");
  const [firstSquadPower, setFirstSquadPower] = useState("");
  const [firstSquadType, setFirstSquadType] = useState("");
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [wallImage, setWallImage] = useState<File | null>(null);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSuccessMessage("");

    const newErrors: Record<string, string> = {};

    if (!heroPower) {
      newErrors.heroPower = "Hero Power is required.";
    } else if (Number(heroPower) < 10000000) {
      newErrors.heroPower = "Hero Power must be at least 8 digits.";
    }

    if (!firstSquadPower) {
      newErrors.firstSquadPower = "First Squad Power is required.";
    } else if (Number(firstSquadPower) < 10000000) {
      newErrors.firstSquadPower =
        "First Squad Power must be at least 8 digits.";
    }

    if (!firstSquadType) {
      newErrors.firstSquadType = "Please select a Squad Type.";
    }

    if (!heroImage) {
      newErrors.heroImage = "Please upload the Hero Power screenshot.";
    }

    if (!wallImage) {
      newErrors.wallImage = "Please upload the Wall screenshot.";
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
        throw new Error(data.error ?? "Failed to submit report.");
      }

      setSuccessMessage("Report submitted successfully.");

      setHeroPower("");
      setFirstSquadPower("");
      setFirstSquadType("");
      setHeroImage(null);
      setWallImage(null);
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
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Weekly Report
      </h1>

      {successMessage && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="mb-2 block font-medium">
            Hero Power
          </label>

          <input
            type="number"
            min={10000000}
            value={heroPower}
            onChange={(e) => setHeroPower(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          {errors.heroPower && (
            <p className="mt-1 text-sm text-red-600">
              {errors.heroPower}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            First Squad Power
          </label>

          <input
            type="number"
            min={10000000}
            value={firstSquadPower}
            onChange={(e) => setFirstSquadPower(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          {errors.firstSquadPower && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstSquadPower}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Squad Type
          </label>

          <select
            value={firstSquadType}
            onChange={(e) => setFirstSquadType(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Squad</option>
            <option value="AIRCRAFT">Aircraft</option>
            <option value="TANKS">Tanks</option>
            <option value="MISSILES">Missiles</option>
          </select>

          {errors.firstSquadType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstSquadType}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Hero Power Screenshot
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setHeroImage(e.target.files?.[0] ?? null)
            }
          />

          {errors.heroImage && (
            <p className="mt-1 text-sm text-red-600">
              {errors.heroImage}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Wall Screenshot
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setWallImage(e.target.files?.[0] ?? null)
            }
          />

          {errors.wallImage && (
            <p className="mt-1 text-sm text-red-600">
              {errors.wallImage}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>

      </form>
    </main>
  );
}