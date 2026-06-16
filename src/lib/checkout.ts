export interface Product {
  product_id: string | number;
  name: string;
  description?: string;
  price_cents: number;
  currency: string;
  image_url?: string;
  stock?: number | null;
}

export interface CartItem {
  product_id: string | number;
  quantity: number;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", {
      cache: "no-store",
      next: { revalidate: 0 },
    } as RequestInit);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function checkout(items: CartItem[]): Promise<void> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("Checkout failed");
  const { url } = await res.json();
  if (url) window.location.href = url;
}

export function formatPrice(
  price_cents: number,
  currency: string = "EUR"
): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(price_cents / 100);
}
