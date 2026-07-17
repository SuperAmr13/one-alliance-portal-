"use client";

type Member = {
  id: string;
    inGameName: string;
    };

    type Props = {
      member: Member | null;
        open: boolean;
          onClose: () => void;
            onConfirm: () => void;
            };

            export default function DeleteMemberModal({
              member,
                open,
                  onClose,
                    onConfirm,
                    }: Props) {
                      if (!open || !member) return null;

                        return (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                                  <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6">
                                          <h2 className="text-xl font-bold text-red-500">
                                                    Delete Member
                                                            </h2>

                                                                    <p className="mt-4 text-zinc-300">
                                                                              Are you sure you want to delete{" "}
                                                                                        <span className="font-bold text-white">
                                                                                                    {member.inGameName}
                                                                                                              </span>
                                                                                                                        ?
                                                                                                                                </p>

                                                                                                                                        <div className="mt-6 flex gap-3">
                                                                                                                                                  <button
                                                                                                                                                              onClick={onConfirm}
                                                                                                                                                                          className="flex-1 rounded-lg bg-red-600 py-3 font-semibold hover:bg-red-700"
                                                                                                                                                                                    >
                                                                                                                                                                                                Delete
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