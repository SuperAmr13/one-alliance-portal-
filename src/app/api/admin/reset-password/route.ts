import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

function generatePassword(length = 10) {
  const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

        let password = "";

          for (let i = 0; i < length; i++) {
              password += chars.charAt(
                    Math.floor(Math.random() * chars.length)
                        );
                          }

                            return password;
                            }

                            export async function POST(req: Request) {
                              try {
                                  const admin = await getCurrentUser();

                                      if (!admin) {
                                            return NextResponse.json(
                                                    { error: "Unauthorized." },
                                                            { status: 401 }
                                                                  );
                                                                      }

                                                                          if (
                                                                                admin.role !== "OWNER" &&
                                                                                      admin.role !== "R5" &&
                                                                                            admin.role !== "R4"
                                                                                                ) {
                                                                                                      return NextResponse.json(
                                                                                                              { error: "Forbidden." },
                                                                                                                      { status: 403 }
                                                                                                                            );
                                                                                                                                }

                                                                                                                                    const { id } = await req.json();

                                                                                                                                        const user = await prisma.user.findUnique({
                                                                                                                                              where: { id },
                                                                                                                                                  });

                                                                                                                                                      if (!user) {
                                                                                                                                                            return NextResponse.json(
                                                                                                                                                                    { error: "Member not found." },
                                                                                                                                                                            { status: 404 }
                                                                                                                                                                                  );
                                                                                                                                                                                      }

                                                                                                                                                                                          const tempPassword = generatePassword();

                                                                                                                                                                                              const passwordHash = await bcrypt.hash(tempPassword, 12);

                                                                                                                                                                                                  await prisma.user.update({
                                                                                                                                                                                                        where: {
                                                                                                                                                                                                                id: user.id,
                                                                                                                                                                                                                      },
                                                                                                                                                                                                                            data: {
                                                                                                                                                                                                                                    passwordHash,
                                                                                                                                                                                                                                            mustChangePassword: true,
                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                          return NextResponse.json({
                                                                                                                                                                                                                                                                success: true,
                                                                                                                                                                                                                                                                      password: tempPassword,
                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                                                                                                                console.error(error);

                                                                                                                                                                                                                                                                                    return NextResponse.json(
                                                                                                                                                                                                                                                                                          { error: "Internal server error." },
                                                                                                                                                                                                                                                                                                { status: 500 }
                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                      }