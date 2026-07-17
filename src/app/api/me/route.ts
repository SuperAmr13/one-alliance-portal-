import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
      const user = await getCurrentUser();

          if (!user) {
                return NextResponse.json(
                        { authenticated: false },
                                { status: 401 }
                                      );
                                          }

                                              return NextResponse.json({
                                                    authenticated: true,
                                                          user: {
                                                                  id: user.id,
                                                                          playerId: user.playerId,
                                                                                  inGameName: user.inGameName,
                                                                                          role: user.role,
                                                                                                },
                                                                                                    });
                                                                                                      } catch (error) {
                                                                                                          console.error(error);

                                                                                                              return NextResponse.json(
                                                                                                                    { error: "Internal server error." },
                                                                                                                          { status: 500 }
                                                                                                                              );
                                                                                                                                }
                                                                                                                                }