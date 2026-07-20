import { NextResponse } from "next/server";
import { processAutoCycle } from "@/lib/cycle";

export async function GET() {
  try {
      const cycle = await processAutoCycle();

          return NextResponse.json({
                success: true,
                      cycle,
                          });
                            } catch (error) {
                                console.error("Cycle Cron Error:", error);

                                    return NextResponse.json(
                                          {
                                                  success: false,
                                                          error: "Cycle automation failed.",
                                                                },
                                                                      {
                                                                              status: 500,
                                                                                    }
                                                                                        );
                                                                                          }
                                                                                          }