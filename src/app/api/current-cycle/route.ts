import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
      const cycle = await prisma.allianceCycle.findFirst({
            where: {
                    isCurrent: true,
                          },
                                select: {
                                        isOpen: true,
                                                startDate: true,
                                                        endDate: true,
                                                                weekNumber: true,
                                                                      },
                                                                          });

                                                                              return NextResponse.json({ cycle });
                                                                                } catch (error) {
                                                                                    console.error(error);

                                                                                        return NextResponse.json(
                                                                                              { error: "Internal server error." },
                                                                                                    { status: 500 }
                                                                                                        );
                                                                                                          }
                                                                                                          }