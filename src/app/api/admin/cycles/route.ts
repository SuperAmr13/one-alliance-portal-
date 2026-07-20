import { NextResponse } from "next/server";
import { adminRoute, badRequest } from "@/lib/api";
import {
  getCurrentCycle,
  createNextCycle,
  openCurrentCycle,
  closeCurrentCycle,
  toggleAutoMode,
} from "@/lib/cycle";

export async function GET() {
  return adminRoute(async () => {
    const cycle = await getCurrentCycle();

    return cycle;
  });
}

export async function POST(request: Request) {
  return adminRoute(async () => {
    const body = await request.json();

    switch (body.action) {
      case "open":
        return await openCurrentCycle();

      case "close":
        return await closeCurrentCycle();

      case "next":
        return await createNextCycle();

      case "toggle-auto":
        return await toggleAutoMode();

      default:
        badRequest("Invalid action.");
    }
  });
}