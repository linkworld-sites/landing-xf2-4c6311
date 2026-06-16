import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiUrl = process.env.PAYMENT_API_URL;
    if (!apiUrl) return NextResponse.json([]);

    const res = await fetch(`${apiUrl}/api/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch {
    return NextResponse.json([]);
  }
}
