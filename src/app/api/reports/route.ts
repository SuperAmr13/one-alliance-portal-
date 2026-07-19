import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";


function getWeekNumber(date: Date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor(
        (date.getTime() - firstDay.getTime()) / 86400000
          );

            return Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
            }

            export async function POST(req: NextRequest) {
              try {
                  const user = await getCurrentUser();

                      if (!user) {
                            return NextResponse.json(
                                    { error: "Unauthorized." },
                                            { status: 401 }
                                                  );
                                                      }

                                                          const today = new Date();
                                                              const day = today.getDay();

                                                                  // الخميس - الجمعة - السبت
                                                                      if (![4, 5, 6].includes(day)) {
                                                                            return NextResponse.json(
                                                                                    {
                                                                                              error:
                                                                                                          "Reports can only be submitted on Thursday, Friday and Saturday.",
                                                                                                                  },
                                                                                                                          { status: 400 }
                                                                                                                                );
                                                                                                                                    }

                                                                                                                                        const body = await req.json();

                                                                                                                                            const weekNumber = getWeekNumber(today);

                                                                                                                                                const exists = await prisma.report.findUnique({
                                                                                                                                                      where: {
                                                                                                                                                              userId_weekNumber: {
                                                                                                                                                                        userId: user.id,
                                                                                                                                                                                  weekNumber,
                                                                                                                                                                                          },
                                                                                                                                                                                                },
                                                                                                                                                                                                    });

                                                                                                                                                                                                        if (exists) {
                                                                                                                                                                                                              return NextResponse.json(
                                                                                                                                                                                                                      {
                                                                                                                                                                                                                                error: "You have already submitted this week's report.",
                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                { status: 400 }
                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                              const report = await prisma.report.create({
                                                                                                                                                                                                                                                                    data: {
                                                                                                                                                                                                                                                                            userId: user.id,
                                                                                                                                                                                                                                                                                    weekNumber,
                                                                                                                                                                                                                                                                                            heroPower: BigInt(body.heroPower),
                                                                                                                                                                                                                                                                                                    firstSquadPower: BigInt(body.firstSquadPower),
                                                                                                                                                                                                                                                                                                            firstSquadType: body.firstSquadType,
                                                                                                                                                                                                                                                                                                                    heroPowerImage: body.heroImagePath,
                                                                                                                                                                                                                                                                                                                            wallImage: body.wallImagePath,
                                                                                                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                                                                          return NextResponse.json(report);
                                                                                                                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                                                                                                                console.error(error);

                                                                                                                                                                                                                                                                                                                                                    return NextResponse.json(
                                                                                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                                                                                                  error: "Internal server error.",
                                                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                                                              { status: 500 }
                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                    }