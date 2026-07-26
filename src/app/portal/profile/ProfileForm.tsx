"use client";

import { useState } from "react";

type Props = {
    user: {
        inGameName: string;
        playerId: string;
        role: string;
    };
};

export default function ProfileForm({ user }: Props) {
    const [name, setName] = useState(user.inGameName);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function saveProfile() {
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            let profileImageUrl: string | null = null;

            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadRes = await fetch("/api/upload/profile-image", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();

                if (!uploadRes.ok) {
                    setError(uploadData.error || "Image upload failed.");
                    setLoading(false);
                    return;
                }

                profileImageUrl = uploadData.path;
            }

            const res = await fetch("/api/profile/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inGameName: name,
                    profileImageUrl,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to update profile.");
                return;
            }

            setSuccess("Profile updated successfully.");

            setTimeout(() => {
              window.location.reload();
              }, 800);
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="mt-8 rounded-2xl border border-blue-800 bg-[#0b1024] p-6">
            <h2 className="text-xl font-bold">Edit Profile</h2>

            <label className="mt-6 block text-sm text-gray-400">
                Profile Image
            </label>

            <input
                type="file"
                accept="image/*"
                className="mt-2 block w-full text-sm text-gray-300"
                onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                }}
            />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 h-28 w-28 rounded-full object-cover border border-blue-600"
                />
            )}

            <label className="mt-6 block text-sm text-gray-400">
                In-Game Name
            </label>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-blue-700 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
            />

            <button
                onClick={saveProfile}
                disabled={loading}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>

            {success && (
                <p className="mt-4 text-green-400">
                    {success}
                </p>
            )}

            {error && (
                <p className="mt-4 text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}