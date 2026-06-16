import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiUrl = process.env.FUNNEL_API_URL || process.env.PAYMENT_API_URL;
    if (apiUrl) {
      await fetch(`${apiUrl}/api/funnel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => {});
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
