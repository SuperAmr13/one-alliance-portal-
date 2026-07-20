import { getCurrentUser } from "@/lib/session";

export async function requireAdmin() {
  const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
          }

            if (!user.approved) {
                throw new Error("Account is not approved");
                  }

                    if (
                        user.role !== "OWNER" &&
                            user.role !== "R5" &&
                                user.role !== "R4"
                                  ) {
                                      throw new Error("Forbidden");
                                        }

                                          return user;
                                          }