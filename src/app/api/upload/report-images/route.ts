import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabaseServer } from "@/lib/supabase-server";

const MAX_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File is larger than 5MB." },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabaseServer.storage
      .from("reports")
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      path: fileName,
    });
  } catch {
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}