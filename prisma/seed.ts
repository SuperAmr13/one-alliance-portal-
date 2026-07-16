import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("@MR.AMR13", 10);

  await prisma.user.upsert({
    where: {
      playerId: "1200307497001771",
    },
    update: {
      inGameName: "MR AMR",
      passwordHash,
      role: Role.OWNER,
      approved: true,
    },
    create: {
      playerId: "1200307497001771",
      inGameName: "MR AMR",
      passwordHash,
      role: Role.OWNER,
      approved: true,
    },
  });

  console.log("✅ OWNER account created/updated.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
