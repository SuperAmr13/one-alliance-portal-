import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const mode = searchParams.get("mode") ?? "current";
        const weekId = searchParams.get("id");

        let cycles;

        if (mode === "all") {
            cycles = await prisma.allianceCycle.findMany({
                orderBy: {
                    weekNumber: "asc",
                },
            });
        } else if (mode === "week" && weekId) {
            cycles = await prisma.allianceCycle.findMany({
                where: {
                    id: weekId,
                },
            });
        } else {
            const current = await prisma.allianceCycle.findFirst({
                  orderBy: {
                      weekNumber: "desc",
                        },
                        });

            if (!current) {
                return NextResponse.json(
                    { error: "No active cycle found." },
                    { status: 404 }
                );
            }

            cycles = [current];
        }

        const users = await prisma.user.findMany({
            where: {
                approved: true,
            },
            orderBy: {
                inGameName: "asc",
            },
        });

        const reports = await prisma.report.findMany({
            where: {
                cycleId: {
                    in: cycles.map((c) => c.id),
                },
            },
            include: {
                cycle: true,
                user: true,
            },
        });

        const workbook = new ExcelJS.Workbook();

        workbook.creator = "ONe Alliance";
        workbook.created = new Date();

        const sheet = workbook.addWorksheet("Reports");

        sheet.views = [
            {
                state: "frozen",
                xSplit: 1,
                ySplit: 2,
            },
        ];

        sheet.mergeCells("A1:A2");

        sheet.getCell("A1").value = "Player";

        sheet.getCell("A1").font = {
            bold: true,
            color: {
                argb: "FFFFFFFF",
            },
        };

        sheet.getCell("A1").fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FF2E7D32",
            },
        };

        sheet.getColumn(1).width = 30;

        let column = 2;
        for (const cycle of cycles) {
            sheet.mergeCells(1, column, 1, column + 1);

            const weekCell = sheet.getCell(1, column);

            weekCell.value = `Week ${cycle.weekNumber}`;

            weekCell.font = {
                bold: true,
                color: {
                    argb: "FFFFFFFF",
                },
            };

            weekCell.alignment = {
                horizontal: "center",
                vertical: "middle",
            };

            weekCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "FF1565C0",
                },
            };

            const heroHeader = sheet.getCell(2, column);

            heroHeader.value = "Hero Power";

            heroHeader.font = {
                bold: true,
            };

            heroHeader.alignment = {
                horizontal: "center",
            };

            heroHeader.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "FFD9EAD3",
                },
            };

            const squadHeader = sheet.getCell(2, column + 1);

            squadHeader.value = "Squad Power";

            squadHeader.font = {
                bold: true,
            };

            squadHeader.alignment = {
                horizontal: "center",
            };

            squadHeader.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: {
                    argb: "FFD9EAD3",
                },
            };

            sheet.getColumn(column).width = 18;
            sheet.getColumn(column + 1).width = 18;

            column += 2;
        } 
            let row = 3;

            for (const user of users) {
                sheet.getCell(row, 1).value = user.inGameName;

                column = 2;

                for (const cycle of cycles) {
                    const report = reports.find(
                        (r) =>
                            r.userId === user.id &&
                            r.cycleId === cycle.id
                    );

                    sheet.getCell(row, column).value =
                        report?.heroPower?.toString() ?? "-";

                    sheet.getCell(row, column + 1).value =
                        report?.firstSquadPower?.toString() ?? "-";

                    column += 2;
                }

                row++;
            }                                                                                                                               for (let r = 1; r < row; r++) {
        for (let c = 1; c < column; c++) {
            sheet.getCell(r, c).border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        }
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition":
                'attachment; filename="ONe-Alliance-Reports.xlsx"',
        },
    });
} 
catch (error) {
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