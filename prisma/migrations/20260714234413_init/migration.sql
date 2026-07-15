-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'R4', 'R5');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "inGameName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_playerId_key" ON "User"("playerId");
