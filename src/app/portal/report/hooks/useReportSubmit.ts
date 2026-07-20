"use client";

import { useState } from "react";
import { uploadImage } from "../utils/uploadImage";

type SubmitReportData = {
  heroPower: string;
    firstSquadPower: string;
      firstSquadType: string;

        heroImage: File | null;
          wallImage: File | null;
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
                                              newErrors.heroPower = "Hero Power must be at least 8 digits.";
                                                  }

                                                      if (!data.firstSquadPower) {
                                                            newErrors.firstSquadPower = "First Squad Power is required.";
                                                                } else if (Number(data.firstSquadPower) < 10000000) {
                                                                      newErrors.firstSquadPower =
                                                                              "First Squad Power must be at least 8 digits.";
                                                                                  }

                                                                                      if (!data.firstSquadType) {
                                                                                            newErrors.firstSquadType = "Please select a Squad Type.";
                                                                                                }

                                                                                                    if (!data.heroImage) {
                                                                                                          newErrors.heroImage =
                                                                                                                  "Please upload the Hero Power screenshot.";
                                                                                                                      }

                                                                                                                          if (!data.wallImage) {
                                                                                                                                newErrors.wallImage =
                                                                                                                                        "Please upload the Wall screenshot.";
                                                                                                                                            }

                                                                                                                                                setErrors(newErrors);

                                                                                                                                                    if (Object.keys(newErrors).length > 0) {
                                                                                                                                                          return false;
                                                                                                                                                              }

                                                                                                                                                                  setLoading(true);

                                                                                                                                                                      try {
                                                                                                                                                                            const heroImagePath = await uploadImage(data.heroImage!);
                                                                                                                                                                                  const wallImagePath = await uploadImage(data.wallImage!);

                                                                                                                                                                                        const response = await fetch("/api/reports", {
                                                                                                                                                                                                method: "POST",
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
                                                                                                                                                                                                                                                                                                                      throw new Error(result.error ?? "Failed to submit report.");
                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                  setErrors({});
                                                                                                                                                                                                                                                                                                                                        setSuccessMessage("Report submitted successfully.");

                                                                                                                                                                                                                                                                                                                                              return true;
                                                                                                                                                                                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                                                                                                                                                                                        setErrors({
                                                                                                                                                                                                                                                                                                                                                                submit:
                                                                                                                                                                                                                                                                                                                                                                          error instanceof Error
                                                                                                                                                                                                                                                                                                                                                                                      ? error.message
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