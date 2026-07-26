"use client";

import { useEffect, useState } from "react";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";

type Props = {
  open: boolean;
  onClose: () => void;
  user: {
    inGameName: string;
    playerId: string;
    role: string;
  };
  forceSecurity?: boolean;
};

export default function EditProfileModal({
  open,
  onClose,
  user,
  forceSecurity = false,
}: Props) {
  const [tab, setTab] = useState<"profile" | "security">(
    forceSecurity ? "security" : "profile"
  );

  useEffect(() => {
    if (forceSecurity) {
      setTab("security");
    }
  }, [forceSecurity]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && !forceSecurity) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, forceSecurity, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => {
        if (!forceSecurity) {
          onClose();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-blue-800 bg-[#0b1024] shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-center justify-between border-b border-blue-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-white">
              Edit Profile
            </h2>

            <p className="text-sm text-gray-400">
              {user.playerId}
            </p>
          </div>

          {!forceSecurity && (
            <button
              onClick={onClose}
              className="text-2xl text-gray-400 transition hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex border-b border-blue-800">
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 py-3 font-semibold transition ${
              tab === "profile"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setTab("security")}
            className={`flex-1 py-3 font-semibold transition ${
              tab === "security"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Security
          </button>
        </div>

        <div className="p-6">
          {tab === "profile" ? (
            <ProfileTab
              user={user}
              onSaved={() => {
                window.location.reload();
              }}
            />
          ) : (
            <SecurityTab
              forceChange={forceSecurity}
              onSuccess={() => {
                if (forceSecurity) {
                  window.location.reload();
                } else {
                  onClose();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}