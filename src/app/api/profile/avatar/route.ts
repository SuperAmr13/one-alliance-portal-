import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!user.profileImageUrl) {
            return NextResponse.json({
                url: null,
            });
        }

        const { data, error } = await supabaseServer.storage
            .from("profile-images")
            .createSignedUrl(user.profileImageUrl, 60 * 60);

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            url: data.signedUrl,
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to load avatar." },
            { status: 500 }
        );
    }
}