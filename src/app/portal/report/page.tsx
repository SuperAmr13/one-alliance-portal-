"use client";

import { useState } from "react";

import HeroPowerField from "@/app/portal/report/components/HeroPowerField";
import FirstSquadPowerField from "@/app/portal/report/components/FirstSquadPowerField";
import SquadTypeField from "@/app/portal/report/components/SquadTypeField";
import HeroImageUpload from "@/app/portal/report/components/HeroImageUpload";
import WallImageUpload from "@/app/portal/report/components/WallImageUpload";
import SuccessAlert from "@/app/portal/report/components/SuccessAlert";
import ErrorAlert from "@/app/portal/report/components/ErrorAlert";
import SubmitButton from "@/app/portal/report/components/SubmitButton";

import { useReportSubmit } from "@/app/portal/report/hooks/useReportSubmit";

export default function ReportPage() {
  const [heroPower, setHeroPower] = useState("");
  const [firstSquadPower, setFirstSquadPower] = useState("");
  const [firstSquadType, setFirstSquadType] = useState("");

  const [heroImage, setHeroImage] =
    useState<File | null>(null);

  const [wallImage, setWallImage] =
    useState<File | null>(null);

  const [heroPreview, setHeroPreview] =
    useState("");

  const [wallPreview, setWallPreview] =
    useState("");

  const {
    loading,
    errors,
    successMessage,
    submitReport,
    setErrors,
  } = useReportSubmit();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const success = await submitReport({
      heroPower,
      firstSquadPower,
      firstSquadType,
      heroImage,
      wallImage,
    });

    if (!success) return;

    setHeroPower("");
    setFirstSquadPower("");
    setFirstSquadType("");

    setHeroImage(null);
    setWallImage(null);

    setHeroPreview("");
    setWallPreview("");

    setErrors({});
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

        <SuccessAlert
          message={successMessage}
        />

        <ErrorAlert
          message={errors.submit}
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-blue-800 bg-[#0b1024] p-8 shadow-2xl"
        >
          <HeroPowerField
            value={heroPower}
              onChange={(value) => {
                  setHeroPower(value);

                      if (errors.heroPower) {
                            setErrors((prev) => ({
                                    ...prev,
                                            heroPower: "",
                                                  }));
                                                      }
                                                        }}
                                                          error={errors.heroPower}
                                                          />

          <FirstSquadPowerField
            value={firstSquadPower}
              onChange={(value) => {
                  setFirstSquadPower(value);

                      if (errors.firstSquadPower) {
                            setErrors((prev) => ({
                                    ...prev,
                                            firstSquadPower: "",
                                                  }));
                                                      }
                                                        }}
                                                          error={errors.firstSquadPower}
                                                          />

          <SquadTypeField
            value={firstSquadType}
              onChange={(value) => {
                  setFirstSquadType(value);

                      if (errors.firstSquadType) {
                            setErrors((prev) => ({
                                    ...prev,
                                            firstSquadType: "",
                                                  }));
                                                      }
                                                        }}
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

          <SubmitButton
            loading={loading}
          />
        </form>
      </div>
    </main>
  );
}