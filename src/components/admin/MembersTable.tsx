"use client";

import MemberRow from "./MemberRow";

export type Member = {
  id: string;
    playerId: string;
      inGameName: string;
        role: string;
          createdAt: string;
          };

          type Props = {
            members: Member[];
              onRefresh: () => void;
              };

              export default function MembersTable({
                members,
                  onRefresh,
                  }: Props) {
                    if (members.length === 0) {
                        return (
                              <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-8 text-center text-gray-400">
                                      No members found.
                                            </div>
                                                );
                                                  }

                                                    return (
                                                        <div className="overflow-x-auto rounded-xl border border-blue-800 bg-[#0b1024]">
                                                              <table className="min-w-full">
                                                                      <thead className="bg-[#101735]">
                                                                                <tr>
                                                                                            <th className="px-5 py-4 text-left">Player</th>
                                                                                                        <th className="px-5 py-4 text-left">Player ID</th>
                                                                                                                    <th className="px-5 py-4 text-left">Role</th>
                                                                                                                                <th className="px-5 py-4 text-left">Joined</th>
                                                                                                                                            <th className="px-5 py-4 text-center">Actions</th>
                                                                                                                                                      </tr>
                                                                                                                                                              </thead>

                                                                                                                                                                      <tbody>
                                                                                                                                                                                {members.map((member) => (
                                                                                                                                                                                            <MemberRow
                                                                                                                                                                                                          key={member.id}
                                                                                                                                                                                                                        member={member}
                                                                                                                                                                                                                                      onRefresh={onRefresh}
                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                    </tbody>
                                                                                                                                                                                                                                                                          </table>
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                }