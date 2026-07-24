import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const reports = await prisma.report.findMany({
            include: {
                user: true,
                cycle: true,
            },
            orderBy: [
                {
                    cycle: {
                        weekNumber: "asc",
                    },
                },
                {
                    createdAt: "asc",
                },
            ],
        });

        const workbook = new ExcelJS.Workbook();

        workbook.creator = "ONe Alliance";
        workbook.created = new Date();

        const sheet = workbook.addWorksheet("Reports");

        sheet.columns = [
            { header: "Week", key: "week", width: 10 },
            { header: "Player ID", key: "playerId", width: 22 },
            { header: "Player", key: "player", width: 30 },
            { header: "Role", key: "role", width: 12 },
            { header: "Hero Power", key: "hero", width: 18 },
            { header: "Squad Power", key: "squad", width: 18 },
            { header: "Squad Type", key: "type", width: 15 },
            { header: "Hero Image", key: "heroImage", width: 40 },
            { header: "Wall Image", key: "wallImage", width: 40 },
            { header: "Submitted", key: "date", width: 25 },
        ];

        sheet.getRow(1).font = {
            bold: true,
        };

        reports.forEach((report) => {
            sheet.addRow({
                week: report.cycle.weekNumber,
                playerId: report.user.playerId,
                player: report.user.inGameName,
                role: report.user.role,
                hero: report.heroPower.toString(),
                squad: report.firstSquadPower.toString(),
                type: report.firstSquadType,
                heroImage: report.heroPowerImage,
                wallImage: report.wallImage,
                date: report.createdAt.toLocaleString(),
            });
        });

        const summary = workbook.addWorksheet("Summary");

        summary.columns = [
            { header: "Statistic", key: "name", width: 30 },
            { header: "Value", key: "value", width: 20 },
        ];

        summary.getRow(1).font = {
            bold: true,
        };

        const totalMembers = await prisma.user.count({
            where: {
                approved: true,
            },
        });

        const totalReports = reports.length;

        summary.addRow({
            name: "Total Members",
            value: totalMembers,
        });

        summary.addRow({
            name: "Total Reports",
            value: totalReports,
        });

        const buffer = await workbook.xlsx.writeBuffer();

        return new NextResponse(buffer, {
            headers: {
                "Content-Type":
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

                "Content-Disposition":
                    'attachment; filename="ONe-Alliance-Reports.xlsx"',
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to export reports.",
            },
            {
                status: 500,
            }
        );
    }
}