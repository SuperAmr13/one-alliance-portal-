"use client";

import { useState } from "react";
import { uploadImage } from "../utils/uploadImage";

type SubmitReportData = {
    heroPower: string;
    firstSquadPower: string;
    firstSquadType: string;

    heroImage: File | null;
    wallImage: File | null;

    existingHeroImage?: string;
    existingWallImage?: string;

    editing?: boolean;
};

export function useReportSubmit() {
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [successMessage, setSuccessMessage] = useState("");

    async function submitReport(data: SubmitReportData) {
        setSuccessMessage("");

        const newErrors: Record<string, string> = {};

        if (!data.heroPower) {
            newErrors.heroPower = "Hero Power is required.";
        } else if (Number(data.heroPower) < 10000000) {
            newErrors.heroPower =
                "Hero Power must be at least 8 digits.";
        }

        if (!data.firstSquadPower) {
            newErrors.firstSquadPower =
                "First Squad Power is required.";
        } else if (Number(data.firstSquadPower) < 10000000) {
            newErrors.firstSquadPower =
                "First Squad Power must be at least 8 digits.";
        }

        if (!data.firstSquadType) {
            newErrors.firstSquadType =
                "Please select a Squad Type.";
        }

        if (
            !data.editing &&
            !data.heroImage
        ) {
            newErrors.heroImage =
                "Please upload the Hero Power screenshot.";
        }

        if (
            !data.editing &&
            !data.wallImage
        ) {
            newErrors.wallImage =
                "Please upload the Wall screenshot.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return false;
        }

        setLoading(true);

        try {
            let heroImagePath =
                data.existingHeroImage ?? null;

            let wallImagePath =
                data.existingWallImage ?? null;

            if (data.heroImage) {
                heroImagePath = await uploadImage(
                    data.heroImage
                );
            }

            if (data.wallImage) {
                wallImagePath = await uploadImage(
                    data.wallImage
                );
            }
            const response = await fetch("/api/reports", {
                method: data.editing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    heroPower: data.heroPower,
                    firstSquadPower: data.firstSquadPower,
                    firstSquadType: data.firstSquadType,
                    heroImagePath,
                    wallImagePath,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error ??
                    (data.editing
                        ? "Failed to update report."
                        : "Failed to submit report.")
                );
            }

            setErrors({});

            setSuccessMessage(
                data.editing
                    ? "Report updated successfully."
                    : "Report submitted successfully."
            );

            return true;
        } catch (error) {
            setErrors({
                submit:
                    error instanceof Error
                        ? error.message
                        : data.editing
                            ? "Failed to update report."
                            : "Failed to submit report.",
            });

            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        errors,
        successMessage,
        submitReport,
        setErrors,
        setSuccessMessage,
    };
}
