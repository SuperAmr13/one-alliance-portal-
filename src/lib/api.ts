import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function badRequest(message: string): never {
  throw new ApiError(400, message);
}

export function unauthorized(
  message = "Unauthorized."
): never {
  throw new ApiError(401, message);
}

export function forbidden(
  message = "Forbidden."
): never {
  throw new ApiError(403, message);
}

export function notFound(
  message = "Not found."
): never {
  throw new ApiError(404, message);
}

export async function adminRoute<T>(
  handler: (
    user: Awaited<ReturnType<typeof requireAdmin>>
  ) => Promise<T>
) {
  try {
    const user = await requireAdmin();

    const data = await handler(user);

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    if (error instanceof Error) {
      switch (error.message) {
        case "Unauthorized":
          return NextResponse.json(
            { error: "Unauthorized." },
            { status: 401 }
          );

        case "Forbidden":
          return NextResponse.json(
            { error: "Forbidden." },
            { status: 403 }
          );

        case "Account is not approved":
          return NextResponse.json(
            { error: "Account is not approved." },
            { status: 403 }
          );
      }
    }

    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}