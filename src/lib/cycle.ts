import { prisma } from "@/lib/prisma";

export async function getCurrentCycle() {
  return prisma.allianceCycle.findFirst({
    where: {
      isCurrent: true,
    },
    orderBy: {
      weekNumber: "desc",
    },
  });
}

export async function getNextWeekNumber() {
  const lastCycle = await prisma.allianceCycle.findFirst({
    orderBy: {
      weekNumber: "desc",
    },
  });

  return lastCycle ? lastCycle.weekNumber + 1 : 1;
}

export async function initializeFirstCycle() {
  const existing = await prisma.allianceCycle.count();

  if (existing > 0) {
    return null;
  }

  const start = new Date();

  // الخميس القادم
  while (start.getDay() !== 4) {
    start.setDate(start.getDate() + 1);
  }

  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 2); // السبت
  end.setHours(23, 59, 59, 999);

  return prisma.allianceCycle.create({
    data: {
      name: "Week 1",
      weekNumber: 1,
      isCurrent: true,
      isOpen: false,
      autoMode: true,
      manualOverride: false,
      startDate: start,
      endDate: end,
    },
  });
}

export async function createNextCycle() {
  const current = await getCurrentCycle();

  if (current) {
    await prisma.allianceCycle.update({
      where: {
        id: current.id,
      },
      data: {
        isCurrent: false,
        isOpen: false,
      },
    });
  }

  const weekNumber = await getNextWeekNumber();

  const now = new Date();

  const end = new Date(now);
  end.setDate(end.getDate() + 3);

  return prisma.allianceCycle.create({
    data: {
      name: `Week ${weekNumber}`,
      weekNumber,
      isCurrent: true,
      isOpen: true,
      autoMode: true,
      manualOverride: false,
      startDate: now,
      endDate: end,
    },
  });
}

export async function openCurrentCycle() {
  const cycle = await getCurrentCycle();

  if (!cycle) {
    return null;
  }

  return prisma.allianceCycle.update({
    where: {
      id: cycle.id,
    },
    data: {
      isOpen: true,
      manualOverride: true,
    },
  });
}

export async function closeCurrentCycle() {
  const cycle = await getCurrentCycle();

  if (!cycle) {
    return null;
  }

  return prisma.allianceCycle.update({
    where: {
      id: cycle.id,
    },
    data: {
      isOpen: false,
      manualOverride: true,
    },
  });
}

export async function toggleAutoMode() {
  const cycle = await getCurrentCycle();

  if (!cycle) {
    return null;
  }

  return prisma.allianceCycle.update({
    where: {
      id: cycle.id,
    },
    data: {
      autoMode: !cycle.autoMode,
    },
  });
}