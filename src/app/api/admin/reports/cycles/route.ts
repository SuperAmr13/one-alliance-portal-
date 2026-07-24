import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
      const cycles = await prisma.allianceCycle.findMany({
            select: {
                    id: true,
                            weekNumber: true,
                                  },
                                        orderBy: {
                                                weekNumber: "asc",
                                                      },
                                                          });

                                                              return NextResponse.json(cycles);
                                                                } catch (error) {
                                                                    console.error(error);

                                                                        return NextResponse.json(
                                                                              { error: "Failed to load weeks." },
                                                                                    { status: 500 }
                                                                                        );
                                                                                          }
                                                                                          }