import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
      const currentUser = await getCurrentUser();

          if (!currentUser) {
                return NextResponse.json(
                        { error: "Unauthorized." },
                                { status: 401 }
                                      );
                                          }

                                              if (!["OWNER", "R5"].includes(currentUser.role)) {
                                                    return NextResponse.json(
                                                            { error: "You don't have permission." },
                                                                    { status: 403 }
                                                                          );
                                                                              }

                                                                                  const { id } = await req.json();

                                                                                      if (!id) {
                                                                                            return NextResponse.json(
                                                                                                    { error: "User ID is required." },
                                                                                                            { status: 400 }
                                                                                                                  );
                                                                                                                      }

                                                                                                                          const targetUser = await prisma.user.findUnique({
                                                                                                                                where: { id },
                                                                                                                                    });

                                                                                                                                        if (!targetUser) {
                                                                                                                                              return NextResponse.json(
                                                                                                                                                      { error: "User not found." },
                                                                                                                                                              { status: 404 }
                                                                                                                                                                    );
                                                                                                                                                                        }

                                                                                                                                                                            // لا يمكن حذف نفسك
                                                                                                                                                                                if (targetUser.id === currentUser.id) {
                                                                                                                                                                                      return NextResponse.json(
                                                                                                                                                                                              { error: "You can't delete your own account." },
                                                                                                                                                                                                      { status: 403 }
                                                                                                                                                                                                            );
                                                                                                                                                                                                                }

                                                                                                                                                                                                                    // R5 لا يمكنه حذف OWNER أو R5
                                                                                                                                                                                                                        if (
                                                                                                                                                                                                                              currentUser.role === "R5" &&
                                                                                                                                                                                                                                    (targetUser.role === "OWNER" || targetUser.role === "R5")
                                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                              return NextResponse.json(
                                                                                                                                                                                                                                                      { error: "You can't delete this user." },
                                                                                                                                                                                                                                                              { status: 403 }
                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                            await prisma.user.delete({
                                                                                                                                                                                                                                                                                  where: {
                                                                                                                                                                                                                                                                                          id,
                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                        return NextResponse.json({
                                                                                                                                                                                                                                                                                                              success: true,
                                                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                                                    } catch (error) {
                                                                                                                                                                                                                                                                                                                        console.error(error);

                                                                                                                                                                                                                                                                                                                            return NextResponse.json(
                                                                                                                                                                                                                                                                                                                                  { error: "Internal server error." },
                                                                                                                                                                                                                                                                                                                                        { status: 500 }
                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                                              }