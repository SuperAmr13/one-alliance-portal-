import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
      const { id, role } = await req.json();

          if (!id || !role) {
                return NextResponse.json(
                        { error: "Missing data" },
                                { status: 400 }
                                      );
                                          }

                                              const allowedRoles = ["MEMBER", "R4", "R5", "OWNER"];

                                                  if (!allowedRoles.includes(role)) {
                                                        return NextResponse.json(
                                                                { error: "Invalid role" },
                                                                        { status: 400 }
                                                                              );
                                                                                  }

                                                                                      const user = await prisma.user.update({
                                                                                            where: {
                                                                                                    id,
                                                                                                          },
                                                                                                                data: {
                                                                                                                        role,
                                                                                                                              },
                                                                                                                                  });

                                                                                                                                      return NextResponse.json(user);
                                                                                                                                        } catch (error) {
                                                                                                                                            console.error(error);

                                                                                                                                                return NextResponse.json(
                                                                                                                                                      { error: "Internal server error" },
                                                                                                                                                            { status: 500 }
                                                                                                                                                                );
                                                                                                                                                                  }
                                                                                                                                                                  }