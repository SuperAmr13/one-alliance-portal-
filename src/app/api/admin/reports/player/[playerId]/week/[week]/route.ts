import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseServer } from "@/lib/supabase-server";
import {
  adminRoute,
  notFound,
} from "@/lib/api";

type Params = {
  params: Promise<{
    playerId: string;
    week: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: Params
) {
  return adminRoute(async () => {
    const { playerId, week } = await params;

    const user = await prisma.user.findUnique({
      where: {
        playerId,
      },
    });

    if (!user) {
      notFound("Player not found.");
    }

    const cycle = await prisma.allianceCycle.findUnique({
      where: {
        weekNumber: Number(week),
      },
    });

    if (!cycle) {
      notFound("Alliance cycle not found.");
    }

    const report = await prisma.report.findUnique({
      where: {
        userId_cycleId: {
          userId: user.id,
          cycleId: cycle.id,
        },
      },
      include: {
        cycle: true,
      },
    });

    if (!report) {
      notFound("Report not found.");
    }

    const { data: heroImage } = await supabaseServer.storage
      .from("reports")
      .createSignedUrl(report.heroPowerImage, 60 * 60);

    const { data: wallImage } = await supabaseServer.storage
      .from("reports")
      .createSignedUrl(report.wallImage, 60 * 60);

    return {
      player: {
        playerId: user.playerId,
        inGameName: user.inGameName,
        role: user.role,
      },

      report: {
        id: report.id,
        cycleId: report.cycleId,
        weekNumber: report.cycle.weekNumber,
        heroPower: report.heroPower.toString(),
        firstSquadPower: report.firstSquadPower.toString(),
        firstSquadType: report.firstSquadType,
        heroPowerImage: heroImage?.signedUrl ?? "",
        wallImage: wallImage?.signedUrl ?? "",
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      },
    };
  });
}