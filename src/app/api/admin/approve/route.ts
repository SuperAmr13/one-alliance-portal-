import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
      const { id } = await req.json();

          if (!id) {
                return NextResponse.json(
                        { error: "User ID is required." },
                                { status: 400 }
                                      );
                                          }

                                              await prisma.user.update({
                                                    where: {
                                                            id,
                                                                  },
                                                                        data: {
                                                                                approved: true,
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