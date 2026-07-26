"use client";

import { useState } from "react";

type Props = {
  user: {
    inGameName: string;
    playerId: string;
    role: string;
  };
  onSaved: () => void;
};

export default function ProfileTab({ user, onSaved }: Props) {
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
        onSaved();
      }, 800);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Profile Image
        </label>

        <input
          type="file"
          accept="image/*"
          className="block w-full rounded-lg border border-blue-800 bg-[#050816] p-3 text-white"
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
            className="mt-4 h-28 w-28 rounded-full border border-blue-700 object-cover"
          />
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          In-Game Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-blue-800 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      <button
        disabled={loading}
        onClick={saveProfile}
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
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