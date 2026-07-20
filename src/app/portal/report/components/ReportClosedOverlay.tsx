"use client";

import Link from "next/link";

type Props = {
  nextOpenDate: string;
  };

  export default function ReportClosedOverlay({
    nextOpenDate,
    }: Props) {
      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                <div className="w-full max-w-lg rounded-2xl border border-blue-700 bg-[#0b1024] p-8 text-center shadow-2xl">

                        <div className="mb-5 text-6xl">
                                  🔒
                                          </div>

                                                  <h2 className="text-3xl font-bold text-blue-400">
                                                            Report Submission Closed
                                                                    </h2>

                                                                            <p className="mt-4 text-gray-300">
                                                                                      Weekly report submission is currently unavailable.
                                                                                              </p>

                                                                                                      <div className="mt-8 rounded-xl border border-blue-800 bg-[#050816] p-5">

                                                                                                                <p className="text-sm uppercase tracking-widest text-gray-400">
                                                                                                                            Next Cycle Opens
                                                                                                                                      </p>

                                                                                                                                                <p className="mt-3 text-xl font-semibold text-white">
                                                                                                                                                            {new Date(nextOpenDate).toLocaleString()}
                                                                                                                                                                      </p>

                                                                                                                                                                              </div>

                                                                                                                                                                                      <p className="mt-6 text-sm text-gray-500">
                                                                                                                                                                                                Reports will become available automatically when the alliance cycle opens.
                                                                                                                                                                                                        </p>

                                                                                                                                                                                                                <Link
                                                                                                                                                                                                                          href="/portal"
                                                                                                                                                                                                                                    className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                      ← Back to Portal
                                                                                                                                                                                                                                                              </Link>

                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                          }