import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: Request) {
      try {
            const user = await getCurrentUser();

            if (!user) {
                  return NextResponse.json(
                        { error: "Unauthorized." },
                        { status: 401 }
                  );
            }

            const {
                  currentPassword,
                  newPassword,
            } = await req.json();

            if (!newPassword) {
                  return NextResponse.json(
                        { error: "New password is required." },
                        { status: 400 }
                  );
            }

            if (newPassword.length < 8) {
                  return NextResponse.json(
                        {
                              error:
                                    "Password must be at least 8 characters.",
                        },
                        { status: 400 }
                  );
            }

            if (!user.mustChangePassword) {
                  if (!currentPassword) {
                        return NextResponse.json(
                              { error: "Current password is required." },
                              { status: 400 }
                        );
                  }

                  const valid = await bcrypt.compare(
                        currentPassword,
                        user.passwordHash
                  );

                  if (!valid) {
                        return NextResponse.json(
                              { error: "Current password is incorrect." },
                              { status: 400 }
                        );
                  }
            }

            const passwordHash = await bcrypt.hash(
                  newPassword,
                  12
            );

            await prisma.user.update({
                  where: {
                        id: user.id,
                  },
                  data: {
                        passwordHash,
                        mustChangePassword: false,
                  },
            });

            return NextResponse.json({
                  success: true,
            });
      } catch (error) {
            console.error(error);

            return NextResponse.json(
                  { error: "Internal server error." },
                  { status: 500 }
            );
      }
}