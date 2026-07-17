import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
      const news = await prisma.news.findMany({
            include: {
                    author: {
                              select: {
                                          id: true,
                                                      inGameName: true,
                                                                  role: true,
                                                                            },
                                                                                    },
                                                                                          },
                                                                                                orderBy: [
                                                                                                        {
                                                                                                                  pinned: "desc",
                                                                                                                          },
                                                                                                                                  {
                                                                                                                                            createdAt: "desc",
                                                                                                                                                    },
                                                                                                                                                          ],
                                                                                                                                                              });

                                                                                                                                                                  return NextResponse.json(news);
                                                                                                                                                                    } catch (error) {
                                                                                                                                                                        console.error(error);

                                                                                                                                                                            return NextResponse.json(
                                                                                                                                                                                  { error: "Failed to load news." },
                                                                                                                                                                                        { status: 500 }
                                                                                                                                                                                            );
                                                                                                                                                                                              }
                                                                                                                                                                                              }

                                                                                                                                                                                              export async function POST(req: NextRequest) {
                                                                                                                                                                                                try {
                                                                                                                                                                                                    const body = await req.json();

                                                                                                                                                                                                        const { title, content, pinned, authorId } = body;

                                                                                                                                                                                                            if (!title || !content || !authorId) {
                                                                                                                                                                                                                  return NextResponse.json(
                                                                                                                                                                                                                          { error: "Missing required fields." },
                                                                                                                                                                                                                                  { status: 400 }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                const news = await prisma.news.create({
                                                                                                                                                                                                                                                      data: {
                                                                                                                                                                                                                                                              title,
                                                                                                                                                                                                                                                                      content,
                                                                                                                                                                                                                                                                              pinned: pinned ?? false,
                                                                                                                                                                                                                                                                                      authorId,
                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                    return NextResponse.json(news);
                                                                                                                                                                                                                                                                                                      } catch (error) {
                                                                                                                                                                                                                                                                                                          console.error(error);

                                                                                                                                                                                                                                                                                                              return NextResponse.json(
                                                                                                                                                                                                                                                                                                                    { error: "Failed to create news." },
                                                                                                                                                                                                                                                                                                                          { status: 500 }
                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                }