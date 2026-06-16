import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiUrl = process.env.PAYMENT_API_URL;
    if (!apiUrl) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    const body = await req.json();
    const res = await fetch(`${apiUrl}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Upstream error");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
