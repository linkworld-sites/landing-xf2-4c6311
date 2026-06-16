"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fetchProducts, checkout, formatPrice, type Product, type CartItem } from "@/lib/checkout";
import { track } from "@/lib/funnel";

const FALLBACK_PRODUCT: Product = {
  product_id: "mastlock-v2",
  name: "MastLOCK V2",
  description: "Precision cam-lock foil mast mounting system. No tools. No screws. 0.4-second setup.",
  price_cents: 31900,
  currency: "EUR",
  image_url: "/images/hero.png",
  stock: null,
};

export default function ShopSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkingOut, setCheckingOut] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetchProducts().then((p) => {
      setProducts(p);
      setLoading(false);
    });
  }, []);

  const displayProducts = products.length > 0 ? products : [FALLBACK_PRODUCT];

  const addToCart = (productId: string | number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === productId);
      if (existing) {
        return prev.map((i) =>
          i.product_id === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product_id: productId, quantity: 1 }];
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    try {
      setCheckingOut(true);
      track("intent");
      await checkout(cart);
      track("convert");
    } catch {
      setCheckingOut(false);
    }
  };

  const featured = displayProducts[0];
  const inStock = featured.stock == null || featured.stock > 0;
  const cartQty = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <section id="shop" ref={ref} className="bg-canvas py-24 sm:py-32 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-accent text-xs tracking-[0.3em] uppercase font-body block mb-4">
            Get Yours
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-bold uppercase text-text-primary tracking-tight">
            Shop.
          </h2>
        </motion.div>

        {/* Featured product */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Product image */}
          <div className="relative rounded-2xl overflow-hidden bg-surface border border-border aspect-[4/3]">
            <Image
              src={featured.image_url || "/images/hero.png"}
              alt={featured.name}
              fill
              className="object-contain p-8"
              style={{ filter: "drop-shadow(0 0 40px rgba(0,212,255,0.12))" }}
            />
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* In-stock pulse */}
              {inStock && (
                <div className="relative flex items-center gap-2">
                  <motion.div
                    className="absolute w-4 h-4 rounded-full bg-accent"
                    animate={{
                      boxShadow: [
                        "0 0 0px 0px rgba(0,212,255,0)",
                        "0 0 0px 12px rgba(0,212,255,0.12)",
                        "0 0 0px 0px rgba(0,212,255,0)",
                      ],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-accent text-xs font-mono ml-1">In stock</span>
                </div>
              )}
            </div>

            <h3 className="font-display text-4xl sm:text-5xl font-bold uppercase text-text-primary tracking-tight mb-3">
              {featured.name}
            </h3>

            {featured.description && (
              <p className="text-text-secondary font-body text-base leading-relaxed mb-6">
                {featured.description}
              </p>
            )}

            <div className="text-gold font-display text-3xl font-bold mb-2">
              {formatPrice(featured.price_cents, featured.currency)}
            </div>
            <p className="text-text-secondary font-body text-sm mb-8">
              Ships within 24h · Free EU shipping over €150 · 30-day returns
            </p>

            {/* Specs recap */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { v: "0.4s", l: "Setup" },
                { v: "6061", l: "Alloy Grade" },
                { v: "IP68", l: "Rated" },
              ].map((s) => (
                <div key={s.l} className="border border-border rounded-lg p-3 text-center bg-surface/50">
                  <div className="font-display text-xl font-bold text-accent">{s.v}</div>
                  <div className="text-text-secondary text-xs tracking-wider uppercase font-body mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            {/* Add to cart + checkout */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCart(featured.product_id)}
                disabled={!inStock || loading}
                className="relative flex-1 flex items-center justify-center gap-3 border border-accent text-accent font-display font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-lg overflow-hidden disabled:opacity-40"
                style={{ borderRadius: "8px" }}
              >
                <motion.span
                  className="absolute inset-0 bg-accent origin-left"
                  variants={{ hover: { scaleX: 1 } }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
                <span className="relative z-10 group-hover:text-canvas transition-colors duration-300">
                  {cartQty > 0 ? `In Cart (${cartQty})` : "Add to Cart"}
                </span>
              </motion.button>

              {cart.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent text-canvas font-display font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-lg disabled:opacity-60"
                  style={{ borderRadius: "8px" }}
                >
                  {checkingOut ? "Redirecting…" : "Checkout"}
                  {!checkingOut && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </motion.button>
              )}
            </div>

            <p className="text-gold font-body text-xs mt-4 tracking-wider">
              Ships within 24h · Includes full shim kit + installation guide
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
