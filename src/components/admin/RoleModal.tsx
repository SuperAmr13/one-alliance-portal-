"use client";

type Member = {
  id: string;
    inGameName: string;
      role: string;
      };

      type Props = {
        member: Member | null;
          open: boolean;
            selectedRole: string;
              onRoleChange: (role: string) => void;
                onClose: () => void;
                  onSave: () => void;
                  };

                  const roles = ["MEMBER", "R4", "R5", "OWNER"];

                  export default function RoleModal({
                    member,
                      open,
                        selectedRole,
                          onRoleChange,
                            onClose,
                              onSave,
                              }: Props) {
                                if (!open || !member) return null;

                                  return (
                                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                                            <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6">
                                                    <h2 className="text-xl font-bold text-white">
                                                              Change Role
                                                                      </h2>

                                                                              <div className="mt-5">
                                                                                        <p className="text-zinc-400">Member</p>
                                                                                                  <p className="font-bold text-white">{member.inGameName}</p>
                                                                                                          </div>

                                                                                                                  <div className="mt-4">
                                                                                                                            <p className="text-zinc-400">Current Role</p>
                                                                                                                                      <p className="font-bold text-blue-400">{member.role}</p>
                                                                                                                                              </div>

                                                                                                                                                      <select
                                                                                                                                                                value={selectedRole}
                                                                                                                                                                          onChange={(e) => onRoleChange(e.target.value)}
                                                                                                                                                                                    className="mt-6 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
                                                                                                                                                                                            >
                                                                                                                                                                                                      {roles.map((role) => (
                                                                                                                                                                                                                  <option key={role} value={role}>
                                                                                                                                                                                                                                {role}
                                                                                                                                                                                                                                            </option>
                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                              </select>

                                                                                                                                                                                                                                                                      <div className="mt-6 flex gap-3">
                                                                                                                                                                                                                                                                                <button
                                                                                                                                                                                                                                                                                            onClick={onSave}
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