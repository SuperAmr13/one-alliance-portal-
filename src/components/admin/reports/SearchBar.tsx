"use client";

type SearchBarProps = {
  value: string;
    onChange: (value: string) => void;
      onOpenFilters: () => void;
        onOpenSort: () => void;
        };

        export default function SearchBar({
          value,
            onChange,
              onOpenFilters,
                onOpenSort,
                }: SearchBarProps) {
                  return (
                      <div className="space-y-4">
                            <div className="relative">
                                    <input
                                              type="text"
                                                        value={value}
                                                                  onChange={(e) => onChange(e.target.value)}
                                                                            placeholder="Search by player name or Player ID..."
                                                                                      className="w-full rounded-xl border border-gray-700 bg-[#0b1024] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500"
                                                                                              />
                                                                                                    </div>

                                                                                                          <div className="flex gap-3">
                                                                                                                  <button
                                                                                                                            onClick={onOpenFilters}
                                                                                                                                      className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
                                                                                                                                              >
                                                                                                                                                        Filters
                                                                                                                                                                </button>

                                                                                                                                                                        <button
                                                                                                                                                                                  onClick={onOpenSort}
                                                                                                                                                                                            className="flex-1 rounded-xl bg-[#1b2340] py-3 font-semibold text-white transition hover:bg-[#27345f]"
                                                                                                                                                                                                    >
                                                                                                                                                                                                              Sort
                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                  }