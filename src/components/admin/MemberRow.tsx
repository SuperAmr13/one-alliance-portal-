"use client";

import { Member } from "./MembersTable";
import RoleBadge from "@/components/RoleBadge";

type Props = {
  member: Member;
    onRefresh: () => void;
    };

    export default function MemberRow({
      member,
        onRefresh,
        }: Props) {
          async function deleteMember() {
              const confirmed = window.confirm(
                    `Delete ${member.inGameName}?`
                        );

                            if (!confirmed) return;

                                const res = await fetch("/api/admin/delete-member", {
                                      method: "POST",
                                            headers: {
                                                    "Content-Type": "application/json",
                                                          },
                                                                body: JSON.stringify({
                                                                        id: member.id,
                                                                              }),
                                                                                  });

                                                                                      const data = await res.json();

                                                                                          if (!res.ok) {
                                                                                                alert(data.error);
                                                                                                      return;
                                                                                                          }

                                                                                                              onRefresh();
                                                                                                                }

                                                                                                                  async function changeRole(role: string) {
                                                                                                                      if (role === member.role) return;

                                                                                                                          const res = await fetch("/api/admin/change-role", {
                                                                                                                                method: "POST",
                                                                                                                                      headers: {
                                                                                                                                              "Content-Type": "application/json",
                                                                                                                                                    },
                                                                                                                                                          body: JSON.stringify({
                                                                                                                                                                  id: member.id,
                                                                                                                                                                          role,
                                                                                                                                                                                }),
                                                                                                                                                                                    });

                                                                                                                                                                                        const data = await res.json();

                                                                                                                                                                                            if (!res.ok) {
                                                                                                                                                                                                  alert(data.error);
                                                                                                                                                                                                        return;
                                                                                                                                                                                                            }

                                                                                                                                                                                                                onRefresh();
                                                                                                                                                                                                                  }

                                                                                                                                                                                                                    return (
                                                                                                                                                                                                                        <tr className="border-t border-blue-900">
                                                                                                                                                                                                                              <td className="px-5 py-4 font-semibold">
                                                                                                                                                                                                                                      {member.inGameName}
                                                                                                                                                                                                                                            </td>

                                                                                                                                                                                                                                                  <td className="px-5 py-4">
                                                                                                                                                                                                                                                          {member.playerId}
                                                                                                                                                                                                                                                                </td>

                                                                                                                                                                                                                                                                      <td className="px-5 py-4">
                                                                                                                                                                                                                                                                              <div className="flex flex-col gap-2">
                                                                                                                                                                                                                                                                                        <RoleBadge role={member.role} />

                                                                                                                                                                                                                                                                                                  <select
                                                                                                                                                                                                                                                                                                              defaultValue={member.role}
                                                                                                                                                                                                                                                                                                                          onChange={(e) => changeRole(e.target.value)}
                                                                                                                                                                                                                                                                                                                                      className="rounded bg-[#111933] border border-blue-700 px-2 py-1"
                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                            <option value="MEMBER">MEMBER</option>
                                                                                                                                                                                                                                                                                                                                                                        <option value="R4">R4</option>
                                                                                                                                                                                                                                                                                                                                                                                    <option value="R5">R5</option>
                                                                                                                                                                                                                                                                                                                                                                                                <option value="OWNER">OWNER</option>
                                                                                                                                                                                                                                                                                                                                                                                                          </select>
                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                        </td>

                                                                                                                                                                                                                                                                                                                                                                                                                              <td className="px-5 py-4">
                                                                                                                                                                                                                                                                                                                                                                                                                                      {new Date(member.createdAt).toLocaleDateString()}
                                                                                                                                                                                                                                                                                                                                                                                                                                            </td>

                                                                                                                                                                                                                                                                                                                                                                                                                                                  <td className="px-5 py-4">
                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div className="flex gap-2 justify-center">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                onClick={deleteMember}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            className="rounded bg-red-600 hover:bg-red-700 px-4 py-2"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Delete
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </tr>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }