"use client";

import { useState } from "react";

type Props = {
      forceChange?: boolean;
      onSuccess: () => void;
};

export default function SecurityTab({
      forceChange = false,
      onSuccess,
}: Props) {
      const [currentPassword, setCurrentPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");

      async function changePassword() {
            setError("");
            setSuccess("");

            if (!forceChange && !currentPassword) {
                  setError("Current password is required.");
                  return;
            }

            if (newPassword.length < 8) {
                  setError("New password must be at least 8 characters.");
                  return;
            }

            if (newPassword !== confirmPassword) {
                  setError("Passwords do not match.");
                  return;
            }

            setLoading(true);

            try {
                  const res = await fetch("/api/change-password", {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              currentPassword,
                              newPassword,
                              forceChange,
                        }),
                  });

                  const data = await res.json();

                  if (!res.ok) {
                        setError(data.error || "Failed to change password.");
                        return;
                  }

                  setSuccess("Password changed successfully.");

                  setTimeout(() => {
                        onSuccess();
                  }, 1000);
            } catch {
                  setError("Something went wrong.");
            } finally {
                  setLoading(false);
            }
      }

      return (
            <div className="space-y-5">
                  {!forceChange && (
                        <div>
                              <label className="mb-2 block text-sm text-gray-400">
                                    Current Password
                              </label>

                              <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full rounded-lg border border-blue-800 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                              />
                        </div>
                  )}

                  <div>
                        <label className="mb-2 block text-sm text-gray-400">
                              New Password
                        </label>

                        <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full rounded-lg border border-blue-800 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                        />
                  </div>

                  <div>
                        <label className="mb-2 block text-sm text-gray-400">
                              Confirm Password
                        </label>

                        <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full rounded-lg border border-blue-800 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                        />
                  </div>

                  <button
                        onClick={changePassword}
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
                  >
                        {loading ? "Changing..." : "Change Password"}
                  </button>

                  {success && (
                        <div className="rounded-lg border border-green-700 bg-green-900/20 p-3 text-center text-green-400">
                              {success}
                        </div>
                  )}

                  {error && (
                        <div className="rounded-lg border border-red-700 bg-red-900/20 p-3 text-center text-red-400">
                              {error}
                        </div>
                  )}
            </div>
      );
}