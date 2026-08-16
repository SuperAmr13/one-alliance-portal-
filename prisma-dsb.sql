-- CreateEnum
CREATE TYPE "DesertStormStatus" AS ENUM ('VOTING', 'STAGE_1', 'STAGE_2', 'TEAM_ASSIGNMENT', 'MAP_SETUP', 'PUBLISHED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DesertStormVote" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "DesertStormTeam" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "DesertStormPosition" AS ENUM ('MAIN', 'SUB');

-- CreateEnum
CREATE TYPE "DesertStormPhase" AS ENUM ('PHASE_1', 'PHASE_2');

-- CreateEnum
CREATE TYPE "DesertStormSelectionSource" AS ENUM ('STAGE_1_AUTO', 'STAGE_1_MANUAL', 'STAGE_2_PRIORITY', 'FORCE_MAIN', 'ADMIN_SWAP', 'ADMIN_ADD', 'ADMIN_REMOVE');

-- CreateEnum
CREATE TYPE "DesertStormActionType" AS ENUM ('CREATE_CYCLE', 'UPDATE_CYCLE', 'MANUAL_STAGE_1', 'MANUAL_EXCLUDE', 'FORCE_MAIN', 'ADD_PLAYER', 'REMOVE_PLAYER', 'SWAP_PLAYER', 'CHANGE_TEAM', 'CHANGE_POSITION', 'PLACE_PLAYER', 'MOVE_PLAYER', 'PUBLISH_MAP', 'UNPUBLISH_MAP', 'FINALIZE_ROSTER');

-- CreateTable
CREATE TABLE "DesertStormCycle" (
    "id" TEXT NOT NULL,
    "cycleNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "votingDate" TIMESTAMP(3) NOT NULL,
    "votingOpenAt" TIMESTAMP(3) NOT NULL,
    "votingCloseAt" TIMESTAMP(3) NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "status" "DesertStormStatus" NOT NULL DEFAULT 'VOTING',
    "sourceAllianceCycleId" TEXT NOT NULL,
    "manualStage1Enabled" BOOLEAN NOT NULL DEFAULT false,
    "mapImageUrl" TEXT,
    "mapPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesertStormCycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesertStormParticipant" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vote" "DesertStormVote",
    "sourceReportId" TEXT,
    "firstSquadPowerSnapshot" BIGINT,
    "weeklyReportSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "mainAppearancesLast3Weeks" INTEGER NOT NULL DEFAULT 0,
    "lastParticipationCycleId" TEXT,
    "lastParticipationCycleNumber" INTEGER,
    "lastParticipationDsbPoints" INTEGER,
    "selectedLastWeek" BOOLEAN NOT NULL DEFAULT false,
    "participatedLastWeek" BOOLEAN NOT NULL DEFAULT false,
    "notifiedUnavailableLastWeek" BOOLEAN NOT NULL DEFAULT false,
    "punishedThisWeek" BOOLEAN NOT NULL DEFAULT false,
    "manualExclude" BOOLEAN NOT NULL DEFAULT false,
    "manualStage1Pick" BOOLEAN NOT NULL DEFAULT false,
    "manualStage2ForceMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesertStormParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesertStormRoster" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "team" "DesertStormTeam" NOT NULL,
    "position" "DesertStormPosition" NOT NULL,
    "slotNumber" INTEGER NOT NULL,
    "selectionSource" "DesertStormSelectionSource" NOT NULL,
    "finalized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesertStormRoster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesertStormMapPlacement" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "rosterId" TEXT NOT NULL,
    "phase" "DesertStormPhase" NOT NULL,
    "x" DECIMAL(6,3) NOT NULL,
    "y" DECIMAL(6,3) NOT NULL,
    "label" TEXT,
    "placedByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesertStormMapPlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesertStormAction" (
    "id" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "adminUserId" TEXT NOT NULL,
    "actionType" "DesertStormActionType" NOT NULL,
    "targetUserId" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DesertStormAction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DesertStormCycle_cycleNumber_key" ON "DesertStormCycle"("cycleNumber");

-- CreateIndex
CREATE UNIQUE INDEX "DesertStormCycle_sourceAllianceCycleId_key" ON "DesertStormCycle"("sourceAllianceCycleId");

-- CreateIndex
CREATE INDEX "DesertStormParticipant_cycleId_vote_idx" ON "DesertStormParticipant"("cycleId", "vote");

-- CreateIndex
CREATE UNIQUE INDEX "DesertStormParticipant_cycleId_userId_key" ON "DesertStormParticipant"("cycleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "DesertStormRoster_participantId_key" ON "DesertStormRoster"("participantId");

-- CreateIndex
CREATE INDEX "DesertStormRoster_cycleId_team_position_idx" ON "DesertStormRoster"("cycleId", "team", "position");

-- CreateIndex
CREATE UNIQUE INDEX "DesertStormRoster_cycleId_team_position_slotNumber_key" ON "DesertStormRoster"("cycleId", "team", "position", "slotNumber");

-- CreateIndex
CREATE INDEX "DesertStormMapPlacement_cycleId_phase_idx" ON "DesertStormMapPlacement"("cycleId", "phase");

-- CreateIndex
CREATE UNIQUE INDEX "DesertStormMapPlacement_rosterId_phase_key" ON "DesertStormMapPlacement"("rosterId", "phase");

-- CreateIndex
CREATE INDEX "DesertStormAction_cycleId_createdAt_idx" ON "DesertStormAction"("cycleId", "createdAt");

-- CreateIndex
CREATE INDEX "DesertStormAction_targetUserId_idx" ON "DesertStormAction"("targetUserId");

-- AddForeignKey
ALTER TABLE "DesertStormCycle" ADD CONSTRAINT "DesertStormCycle_sourceAllianceCycleId_fkey" FOREIGN KEY ("sourceAllianceCycleId") REFERENCES "AllianceCycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormParticipant" ADD CONSTRAINT "DesertStormParticipant_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "DesertStormCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormParticipant" ADD CONSTRAINT "DesertStormParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormParticipant" ADD CONSTRAINT "DesertStormParticipant_sourceReportId_fkey" FOREIGN KEY ("sourceReportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormRoster" ADD CONSTRAINT "DesertStormRoster_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "DesertStormCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormRoster" ADD CONSTRAINT "DesertStormRoster_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "DesertStormParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormMapPlacement" ADD CONSTRAINT "DesertStormMapPlacement_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "DesertStormCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormMapPlacement" ADD CONSTRAINT "DesertStormMapPlacement_rosterId_fkey" FOREIGN KEY ("rosterId") REFERENCES "DesertStormRoster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormMapPlacement" ADD CONSTRAINT "DesertStormMapPlacement_placedByUserId_fkey" FOREIGN KEY ("placedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormAction" ADD CONSTRAINT "DesertStormAction_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "DesertStormCycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesertStormAction" ADD CONSTRAINT "DesertStormAction_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

