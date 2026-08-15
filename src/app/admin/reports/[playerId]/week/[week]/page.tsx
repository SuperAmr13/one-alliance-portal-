"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

import HeroPowerField from "@/app/portal/report/components/HeroPowerField";
import FirstSquadPowerField from "@/app/portal/report/components/FirstSquadPowerField";
import SquadTypeField from "@/app/portal/report/components/SquadTypeField";
import HeroImageUpload from "@/app/portal/report/components/HeroImageUpload";
import WallImageUpload from "@/app/portal/report/components/WallImageUpload";

import { uploadImage } from "@/app/portal/report/utils/uploadImage";

type Data = {
  player: {
    playerId: string;
    inGameName: string;
    role: string;
  };

  report: {
    id: string;
    cycleId: string;
    weekNumber: number;
    heroPower: string;
    firstSquadPower: string;
    firstSquadType: string;
    heroPowerImage: string;
    wallImage: string;
    createdAt: string;
    updatedAt: string;
  };
};

export default function WeekPage({
  params,
}: {
  params: Promise<{
    playerId: string;
    week: string;
  }>;
}) {
  const { playerId, week } = use(params);

  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [heroPower, setHeroPower] = useState("");
  const [firstSquadPower, setFirstSquadPower] =
    useState("");
  const [firstSquadType, setFirstSquadType] =
    useState("");

  const [heroImage, setHeroImage] =
    useState<File | null>(null);

  const [wallImage, setWallImage] =
    useState<File | null>(null);

  const [heroPreview, setHeroPreview] =
    useState("");

  const [wallPreview, setWallPreview] =
    useState("");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [successMessage, setSuccessMessage] =
    useState("");

  async function load() {
    try {
      const res = await fetch(
        `/api/admin/reports/player/${playerId}/week/${week}`
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json.error ?? "Failed to load report."
        );
      }

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [playerId, week]);

  function startEditing() {
    if (!data) return;

    setHeroPower(data.report.heroPower);
    setFirstSquadPower(
      data.report.firstSquadPower
    );
    setFirstSquadType(
      data.report.firstSquadType
    );

    setHeroImage(null);
    setWallImage(null);

    setHeroPreview(
      data.report.heroPowerImage
    );

    setWallPreview(
      data.report.wallImage
    );

    setErrors({});
    setSuccessMessage("");
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);

    setHeroPower("");
    setFirstSquadPower("");
    setFirstSquadType("");

    setHeroImage(null);
    setWallImage(null);

    setHeroPreview("");
    setWallPreview("");

    setErrors({});
    setSuccessMessage("");
  }

  async function handleSave() {
    const newErrors: Record<string, string> = {};

    if (!heroPower) {
      newErrors.heroPower =
        "Hero Power is required.";
    } else if (Number(heroPower) < 10000000) {
      newErrors.heroPower =
        "Hero Power must be at least 8 digits.";
    }

    if (!firstSquadPower) {
      newErrors.firstSquadPower =
        "First Squad Power is required.";
    } else if (
      Number(firstSquadPower) < 10000000
    ) {
      newErrors.firstSquadPower =
        "First Squad Power must be at least 8 digits.";
    }

    if (!firstSquadType) {
      newErrors.firstSquadType =
        "Please select a Squad Type.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSaving(true);
    setSuccessMessage("");

    try {
      let heroImagePath: string | null = null;
      let wallImagePath: string | null = null;

      if (heroImage) {
        heroImagePath =
          await uploadImage(heroImage);
      }

      if (wallImage) {
        wallImagePath =
          await uploadImage(wallImage);
      }

      const res = await fetch(
        `/api/admin/reports/player/${playerId}/week/${week}`,
        {
          method: "PUT",
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
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error ??
            "Failed to update report."
        );
      }

      setSuccessMessage(
        "Report updated successfully."
      );

      await load();

      setEditing(false);

      setHeroImage(null);
      setWallImage(null);

      setHeroPreview("");
      setWallPreview("");

      setErrors({});
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Failed to update report.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] p-8 text-white">
        Loading...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#050816] p-8 text-white">
        Report not found.
      </main>
    );
  }

  const { player, report } = data;

  const canEdit =
    player.role === "R4" ||
    player.role === "R5";
    player.role === "OWNER";

  return (
    <main className="min-h-screen bg-[#050816] p-8 text-white">

      <Link
        href={`/admin/reports/${player.playerId}`}
        className="text-blue-400 hover:underline"
      >
        ← Back
      </Link>

      <div className="mx-auto max-w-4xl">

        <div className="mt-6 rounded-xl border border-blue-800 bg-[#0b1024] p-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-3xl font-bold">
                {player.inGameName}
              </h1>

              <p className="mt-2 text-gray-400">
                Week {report.weekNumber}
              </p>
            </div>

            {canEdit && !editing && (
              <button
                type="button"
                onClick={startEditing}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
              >
                ✏️ Edit Report
              </button>
            )}

          </div>

          {successMessage && (
            <div className="mt-6 rounded-xl border border-green-700 bg-green-900/20 p-4 text-green-300">
              {successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="mt-6 rounded-xl border border-red-700 bg-red-900/20 p-4 text-red-300">
              {errors.submit}
            </div>
          )}

        </div>

        {!editing ? (
          <>
            <div className="mt-8 rounded-xl border border-gray-700 bg-[#0b1024] p-6">

              <div className="space-y-3">

                <p>
                  <strong>Hero Power:</strong>{" "}
                  {Number(
                    report.heroPower
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>First Squad Power:</strong>{" "}
                  {Number(
                    report.firstSquadPower
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>First Squad Type:</strong>{" "}
                  {report.firstSquadType}
                </p>

                <p className="text-sm text-gray-400">
                  Last Updated:{" "}
                  {new Date(
                    report.updatedAt
                  ).toLocaleString()}
                </p>

              </div>

            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="rounded-xl border border-gray-700 bg-[#0b1024] p-4">

                <h2 className="mb-4 text-xl font-semibold">
                  Hero Power Image
                </h2>

                <img
                  src={report.heroPowerImage}
                  alt="Hero Power"
                  className="w-full rounded-lg"
                />

              </div>

              <div className="rounded-xl border border-gray-700 bg-[#0b1024] p-4">

                <h2 className="mb-4 text-xl font-semibold">
                  Wall Image
                </h2>

                <img
                  src={report.wallImage}
                  alt="Wall"
                  className="w-full rounded-lg"
                />

              </div>

            </div>
          </>
        ) : (
          <div className="mt-8 rounded-2xl border border-blue-800 bg-[#0b1024] p-6">

            <h2 className="mb-6 text-2xl font-bold text-blue-400">
              Edit Weekly Report
            </h2>

            <div className="space-y-6">

              <HeroPowerField
                value={heroPower}
                onChange={setHeroPower}
                error={errors.heroPower}
              />

              <FirstSquadPowerField
                value={firstSquadPower}
                onChange={setFirstSquadPower}
                error={errors.firstSquadPower}
              />

              <SquadTypeField
                value={firstSquadType}
                onChange={setFirstSquadType}
                errors={errors}
              />

              <HeroImageUpload
                heroImage={heroImage}
                setHeroImage={setHeroImage}
                heroPreview={heroPreview}
                setHeroPreview={setHeroPreview}
                errors={errors}
              />

              <WallImageUpload
                wallImage={wallImage}
                setWallImage={setWallImage}
                wallPreview={wallPreview}
                setWallPreview={setWallPreview}
                errors={errors}
              />

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={cancelEditing}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-gray-700 py-4 font-semibold transition hover:bg-gray-800 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 rounded-xl bg-blue-600 py-4 font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}