import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    ready: false,
    message: "Scanner API placeholder. Full scan logic lands in a later phase.",
  });
}

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      ready: false,
      message: "Scanner API placeholder. Full scan logic lands in a later phase.",
    },
    { status: 501 },
  );
}
