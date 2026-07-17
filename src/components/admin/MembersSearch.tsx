type MembersSearchProps = {
      value: string;
        onChange: (value: string) => void;
        };

        export default function MembersSearch({
          value,
            onChange,
            }: MembersSearchProps) {
              return (
                  <input
                        type="text"
                              value={value}
                                    placeholder="Search by In Game Name or Player ID..."
                                          onChange={(e) => onChange(e.target.value)}
                                                className="mb-6 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                                                    />
                                                      );
                                                      }
