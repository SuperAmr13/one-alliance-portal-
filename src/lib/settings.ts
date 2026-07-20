import { prisma } from "@/lib/prisma";

export async function getSettings() {
  let settings = await prisma.allianceSettings.findFirst();

    if (!settings) {
        settings = await prisma.allianceSettings.create({
              data: {
                      cycleStartDay: 4,
                              cycleEndDay: 6,
                                      cycleStartHour: 0,
                                              cycleEndHour: 23,
                                                      autoMode: true,
                                                            },
                                                                });
                                                                  }

                                                                    return settings;
                                                                    }

                                                                    export async function updateSettings(data: {
                                                                      cycleStartDay: number;
                                                                        cycleEndDay: number;
                                                                          cycleStartHour: number;
                                                                            cycleEndHour: number;
                                                                              autoMode: boolean;
                                                                              }) {
                                                                                const settings = await getSettings();

                                                                                  return prisma.allianceSettings.update({
                                                                                      where: {
                                                                                            id: settings.id,
                                                                                                },
                                                                                                    data,
                                                                                                      });
                                                                                                      }