import { Check, Copy, Percent, Truck, CircleDot } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { COUPON_CODE, DELIVERY_FEE, FREE_DELIVERY_ABOVE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
    } catch {
      /* clipboard may be blocked; still show feedback */
    }
    setCopied(true);
    toast.success(`Code ${COUPON_CODE} copied`, { description: "Paste it in your cart for 20% off." });
    setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}

export function CouponBanner({ compact = false }: { compact?: boolean }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-amber/50 bg-surface-raised text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-amber",
        compact ? "p-3 pr-4" : "p-4 pr-5",
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-amber text-amber-foreground">
        <Percent className="size-5" />
      </span>
      <span>
        <span className="block text-xs uppercase tracking-widest text-muted-foreground">
          20% off your order
        </span>
        <span className="mt-0.5 flex items-center gap-2 font-display text-lg font-semibold">
          Use <span className="rounded-md border border-dashed border-amber px-2 text-amber">{COUPON_CODE}</span>
          {copied ? <Check className="size-4 text-veg" /> : <Copy className="size-4 text-muted-foreground transition-colors group-hover:text-amber" />}
        </span>
      </span>
    </button>
  );
}

export function Offers() {
  const { copied, copy } = useCopy();
  return (
    <section id="offers" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Offers</p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Hot deals, fresh out the oven</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-flame p-8 text-primary-foreground shadow-glow lg:col-span-2">
          <div className="absolute -right-16 -top-16 size-64 rounded-full border-[28px] border-primary-foreground/10" />
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">Flat 20% off</p>
          <h3 className="mt-3 max-w-md text-4xl font-semibold leading-tight">
            Your first box of happiness, for less.
          </h3>
          <p className="mt-3 max-w-md opacity-80">
            Apply the code at checkout to take 20% off your entire subtotal. No minimum order.
          </p>
          <button
            type="button"
            onClick={copy}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-background px-5 py-3 font-display text-lg font-semibold text-foreground transition-transform hover:scale-[1.03]"
          >
            {COUPON_CODE}
            {copied ? <Check className="size-4 text-veg" /> : <Copy className="size-4 text-amber" />}
          </button>
        </div>
        <div className="grid gap-5">
          <div className="rounded-3xl border border-border bg-card-gradient p-6">
            <Truck className="size-6 text-amber" />
            <h3 className="mt-4 text-xl font-semibold">Free delivery over ₹{FREE_DELIVERY_ABOVE}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Otherwise a flat ₹{DELIVERY_FEE}. Hot at your door in 30 minutes.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card-gradient p-6">
            <CircleDot className="size-6 text-amber" />
            <h3 className="mt-4 text-xl font-semibold">Cheese Burst on any pizza</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Upgrade any size to a molten cheese-filled crust for just +₹60.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
