import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminRoute,
    notFound,
    } from "@/lib/api";

    type Params = {
      params: Promise<{
          playerId: string;
              week: string;
                }>;
                };

                export async function GET(
                  _request: NextRequest,
                    { params }: Params
                    ) {
                      return adminRoute(async () => {
                          const { playerId, week } = await params;

                              const user = await prisma.user.findUnique({
                                    where: {
                                            playerId,
                                                  },
                                                      });

                                                          if (!user) {
                                                                notFound("Player not found.");
                                                                    }

                                                                        const report = await prisma.report.findUnique({
                                                                              where: {
                                                                                      userId_weekNumber: {
                                                                                                userId: user.id,
                                                                                                          weekNumber: Number(week),
                                                                                                                  },
                                                                                                                        },
                                                                                                                            });

                                                                                                                                if (!report) {
                                                                                                                                      notFound("Report not found.");
                                                                                                                                          }

                                                                                                                                              return {
                                                                                                                                                    player: {
                                                                                                                                                            playerId: user.playerId,
                                                                                                                                                                    inGameName: user.inGameName,
                                                                                                                                                                            role: user.role,
                                                                                                                                                                                  },

                                                                                                                                                                                        report: {
                                                                                                                                                                                                id: report.id,
                                                                                                                                                                                                        weekNumber: report.weekNumber,
                                                                                                                                                                                                                heroPower: report.heroPower.toString(),
                                                                                                                                                                                                                        firstSquadPower: report.firstSquadPower.toString(),
                                                                                                                                                                                                                                firstSquadType: report.firstSquadType,
                                                                                                                                                                                                                                        heroPowerImage: report.heroPowerImage,
                                                                                                                                                                                                                                                wallImage: report.wallImage,
                                                                                                                                                                                                                                                        createdAt: report.createdAt,
                                                                                                                                                                                                                                                                updatedAt: report.updatedAt,
                                                                                                                                                                                                                                                                      },
                                                                                                                                                                                                                                                                          };
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            }