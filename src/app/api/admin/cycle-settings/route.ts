import { adminRoute, badRequest } from "@/lib/api";
import { getSettings, updateSettings } from "@/lib/settings";

export async function GET() {
  return adminRoute(async () => {
      return await getSettings();
        });
        }

        export async function POST(request: Request) {
          return adminRoute(async () => {
              const body = await request.json();

                  const {
                        cycleStartDay,
                              cycleEndDay,
                                    cycleStartHour,
                                          cycleEndHour,
                                                autoMode,
                                                    } = body;

                                                        if (
                                                              cycleStartDay === undefined ||
                                                                    cycleEndDay === undefined ||
                                                                          cycleStartHour === undefined ||
                                                                                cycleEndHour === undefined ||
                                                                                      autoMode === undefined
                                                                                          ) {
                                                                                                badRequest("Missing settings.");
                                                                                                    }

                                                                                                        return await updateSettings({
                                                                                                              cycleStartDay,
                                                                                                                    cycleEndDay,
                                                                                                                          cycleStartHour,
                                                                                                                                cycleEndHour,
                                                                                                                                      autoMode,
                                                                                                                                          });
                                                                                                                                            });
                                                                                                                                            }