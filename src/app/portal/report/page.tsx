"use client";

import { useEffect, useState } from "react";

import ReportClosedOverlay from "@/app/portal/report/components/ReportClosedOverlay";
import ReportSubmittedModal from "@/app/portal/report/components/ReportSubmittedModal";

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

  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [wallImage, setWallImage] = useState<File | null>(null);

  const [heroPreview, setHeroPreview] = useState("");
  const [wallPreview, setWallPreview] = useState("");

  const [cycleOpen, setCycleOpen] = useState(true);
  const [nextOpenDate, setNextOpenDate] = useState("");

  const [editing, setEditing] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    loadCycle();
    loadReport();
  }, []);

  async function loadCycle() {
    try {
      const res = await fetch("/api/current-cycle");
      const data = await res.json();

      if (data.cycle) {
        setCycleOpen(data.cycle.isOpen);
        setNextOpenDate(data.cycle.startDate);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadReport() {
    try {
      const res = await fetch("/api/reports");

      if (!res.ok) return;

      const data = await res.json();

      if (!data.report) return;

      setReport(data.report);

      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  }

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
      editing,
      existingHeroImage: report?.heroPowerImage,
      existingWallImage: report?.wallImage,
    });

    if (!success) return;

    await loadReport();

    setEditing(false);

    setShowModal(true);

    setHeroImage(null);
    setWallImage(null);

    setHeroPreview("");
    setWallPreview("");

    setErrors({});
  }
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white">

      {!cycleOpen && (
        <ReportClosedOverlay
          nextOpenDate={nextOpenDate}
        />
      )}

      <ReportSubmittedModal
        open={showModal && !editing}
        canEdit={cycleOpen}
        report={
          report && {
            heroPower: report.heroPower,
            firstSquadPower: report.firstSquadPower,
            firstSquadType: report.firstSquadType,
            createdAt: report.createdAt,
          }
        }
        onClose={() => setShowModal(false)}
        onEdit={() => {
          setShowModal(false);
          setEditing(true);

          setHeroPower(report.heroPower);
          setFirstSquadPower(report.firstSquadPower);
          setFirstSquadType(report.firstSquadType);
        }}
      />

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-blue-400">
            {editing ? "Edit Weekly Report" : "Weekly Report"}
          </h1>

          <p className="mt-2 text-gray-400">
            {editing
              ? "Update your weekly alliance report."
              : "Submit your weekly alliance report."}
          </p>

        </div>

        <SuccessAlert message={successMessage} />

        <ErrorAlert message={errors.submit} />

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
          )          <SquadTypeField
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
            editing={editing}
          />
        </form>

        {editing && (
          <button
            onClick={() => {
              setEditing(false);

              setHeroPower("");
              setFirstSquadPower("");
              setFirstSquadType("");

              setHeroImage(null);
              setWallImage(null);

              setHeroPreview("");
              setWallPreview("");

              setShowModal(true);

              setErrors({});
            }}
            className="mt-4 w-full rounded-xl border border-red-700 py-3 font-semibold text-red-300 transition hover:bg-red-900/20"
          >
            Cancel Editing
          </button>
        )}
      </div>
    </main>
  );
}