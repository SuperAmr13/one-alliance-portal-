import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
      const body = await request.json();

          const { playerId, ingameName, password } = body;

              if (!playerId || !ingameName || !password) {
                    return NextResponse.json(
                            { error: "All fields are required." },
                                    { status: 400 }
                                          );
                                              }

                                                  return NextResponse.json({
                                                        success: true,
                                                              message: "API is working!",
                                                                    data: {
                                                                            playerId,
                                                                                    ingameName,
                                                                                          },
                                                                                              });
                                                                                                } catch {
                                                                                                    return NextResponse.json(
                                                                                                          { error: "Invalid request." },
                                                                                                                { status: 500 }
                                                                                                                    );
                                                                                                                      }
                                                                                                                      }