"use client";

import { useState } from "react";
import EditProfileModal from "@/components/profile/EditProfileModal";

type Props = {
  force: boolean;
    user: {
        inGameName: string;
            playerId: string;
                role: string;
                  };
                  };

                  export default function ForcePasswordChange({
                    force,
                      user,
                      }: Props) {
                        const [open] = useState(force);

                          if (!force) return null;

                            return (
                                <EditProfileModal
                                      open={open}
                                            onClose={() => {}}
                                                  user={user}
                                                        forceSecurity
                                                            />
                                                              );
                                                              }