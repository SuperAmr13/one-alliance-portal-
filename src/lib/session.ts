import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export function generateSessionToken() {
  return randomUUID();
}

export function getSessionExpiry() {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return expires;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({
      where: { id: session.id },
    });

    return null;
  }

  return session.user;
}