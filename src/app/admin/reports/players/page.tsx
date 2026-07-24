"use client";

import { useEffect, useMemo, useState } from "react";

import PlayerCard from "@/components/admin/reports/PlayerCard";
import SearchBar from "@/components/admin/reports/SearchBar";
import FilterModal from "@/components/admin/reports/FilterModal";
import SortModal from "@/components/admin/reports/SortModal";

type Player = {
    id: string;
    playerId: string;
    inGameName: string;
    role: "OWNER" | "R5" | "R4" | "MEMBER";
    totalReports: number;
    submittedCurrentWeek: boolean;
    lastReportDate: string | null;
};

type ApiResponse = {
    currentWeek: number;
    totalPlayers: number;
    players: Player[];
};

type RoleFilter =
    | "ALL"
    | "OWNER"
    | "R5"
    | "R4"
    | "MEMBER";

type StatusFilter =
    | "ALL"
    | "SUBMITTED"
    | "MISSING";

type SortOption =
    | "NAME_ASC"
    | "NAME_DESC"
    | "ROLE_HIGH"
    | "ROLE_LOW";

const roleOrder: Record<Player["role"], number> = {
    OWNER: 4,
    R5: 3,
    R4: 2,
    MEMBER: 1,
};

export default function PlayersReportsPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const [roleFilter, setRoleFilter] =
        useState<RoleFilter>("ALL");

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("ALL");

    const [sortOption, setSortOption] =
        useState<SortOption>("NAME_ASC");

    useEffect(() => {
        loadPlayers();
    }, []);

    async function loadPlayers() {
        try {
            const res = await fetch("/api/admin/reports/players");

            const data: ApiResponse = await res.json();

            setPlayers(data.players);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const filteredPlayers = useMemo(() => {
        let result = [...players];

        // Search
        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter(
                (player) =>
                    player.inGameName.toLowerCase().includes(query) ||
                    player.playerId.includes(query)
            );
        }

        // Role Filter
        if (roleFilter !== "ALL") {
            result = result.filter(
                (player) => player.role === roleFilter
            );
        }

        // Status Filter
        if (statusFilter === "SUBMITTED") {
            result = result.filter(
                (player) => player.submittedCurrentWeek
            );
        }

        if (statusFilter === "MISSING") {
            result = result.filter(
                (player) => !player.submittedCurrentWeek
            );
        }

        // Sorting
        result.sort((a, b) => {
            switch (sortOption) {
                case "NAME_ASC":
                    return a.inGameName.localeCompare(b.inGameName);

                case "NAME_DESC":
                    return b.inGameName.localeCompare(a.inGameName);

                case "ROLE_HIGH":
                    return roleOrder[b.role] - roleOrder[a.role];

                case "ROLE_LOW":
                    return roleOrder[a.role] - roleOrder[b.role];

                default:
                    return 0;
            }
        });

        return result;
    }, [
        players,
        search,
        roleFilter,
        statusFilter,
        sortOption,
    ]);
    function clearFilters() {
        setRoleFilter("ALL");
        setStatusFilter("ALL");
    }

    function clearSorting() {
        setSortOption("NAME_ASC");
    }
    if (loading) {
        return (
            <main className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
                Loading players...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050816] p-6 text-white">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-400">
                    Players Reports
                </h1>

                <p className="mt-2 text-gray-400">
                    Week Reports Management
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-sm">

                    <div className="rounded-xl bg-[#0b1024] px-4 py-2">
                        Current Week: <span className="font-bold">{players.length > 0 ? "Active" : "-"}</span>
                    </div>

                    <div className="rounded-xl bg-[#0b1024] px-4 py-2">
                        Players: <span className="font-bold">{players.length}</span>
                    </div>

                    <div className="rounded-xl bg-[#0b1024] px-4 py-2">
                        Showing: <span className="font-bold">{filteredPlayers.length}</span>
                    </div>

                </div>
            </div>

            <SearchBar
                value={search}
                onChange={setSearch}
                onOpenFilters={() => setFilterOpen(true)}
                onOpenSort={() => setSortOpen(true)}
            />

            <FilterModal
                open={filterOpen}
                role={roleFilter}
                status={statusFilter}
                onRoleChange={setRoleFilter}
                onStatusChange={setStatusFilter}
                onApply={() => setFilterOpen(false)}
                onClear={() => {
                    clearFilters();
                    setFilterOpen(false);
                }}
                onClose={() => setFilterOpen(false)}
            />

            <SortModal
                open={sortOpen}
                value={sortOption}
                onChange={setSortOption}
                onApply={() => setSortOpen(false)}
                onClear={() => {
                    clearSorting();
                    setSortOpen(false);
                }}
                onClose={() => setSortOpen(false)}
            />

            {filteredPlayers.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-gray-700 p-10 text-center text-gray-400">
                    No players found.
                </div>
            ) : (
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredPlayers.map((player) => (
                        <PlayerCard
                            key={player.playerId}
                            playerId={player.playerId}
                            inGameName={player.inGameName}
                            role={player.role}
                            totalReports={player.totalReports}
                            submittedCurrentWeek={player.submittedCurrentWeek}
                            lastReportDate={player.lastReportDate}
                        />
                    ))}
                </div>
            )}

        </main>
    );
}
    