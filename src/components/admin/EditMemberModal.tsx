"use client";

import { useEffect, useState } from "react";

type Member = {
  id: string;
    inGameName: string;
    };

    type Props = {
      member: Member | null;
        open: boolean;
          onClose: () => void;
            onSave: (name: string) => void;
            };

            export default function EditMemberModal({
              member,
                open,
                  onClose,
                    onSave,
                    }: Props) {
                      const [name, setName] = useState("");

                        useEffect(() => {
                            setName(member?.inGameName ?? "");
                              }, [member]);

                                if (!open || !member) return null;

                                  return (
                                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                                            <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6">
                                                    <h2 className="text-xl font-bold text-white">
                                                              Edit Member
                                                                      </h2>

                                                                              <input
                                                                                        value={name}
                                                                                                  onChange={(e) => setName(e.target.value)}
                                                                                                            className="mt-5 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
                                                                                                                    />

                                                                                                                            <div className="mt-6 flex gap-3">
                                                                                                                                      <button
                                                                                                                                                  onClick={() => onSave(name)}
                                                                                                                                                              className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
                                                                                                                                                                        >
                                                                                                                                                                                    Save
                                                                                                                                                                                              </button>

                                                                                                                                                                                                        <button
                                                                                                                                                                                                                    onClick={onClose}
                                                                                                                                                                                                                                className="flex-1 rounded-lg bg-zinc-700 py-3 font-semibold hover:bg-zinc-600"
                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                      Cancel
                                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                    }