"use client";

import { useState } from "react";
import EditProfileModal from "@/components/profile/EditProfileModal";

type Props = {
  user: {
    inGameName: string;
    playerId: string;
    role: string;
  };
};

export default function ProfileForm({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
        >
          Edit Profile
        </button>
      </div>

      <EditProfileModal
        open={open}
        onClose={() => setOpen(false)}
        user={user}
      />
    </>
  );
}