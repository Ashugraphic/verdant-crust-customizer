import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import type { Pizza } from "@/lib/pizzas";
import { CRUSTS, SIZES, formatINR, unitPrice, type CrustId, type SizeId } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { VegMark } from "./VegMark";

export function PizzaCard({ pizza }: { pizza: Pizza }) {
  const { add } = useCart();
  const [size, setSize] = useState<SizeId>("medium");
  const [crust, setCrust] = useState<CrustId>("classic-pan");
  const [added, setAdded] = useState(false);
  const price = unitPrice(pizza.prices, size, crust);

  const handleAdd = () => {
    add(pizza.id, size, crust);
    setAdded(true);
    const sizeLabel = SIZES.find((s) => s.id === size)!;
    const crustLabel = CRUSTS.find((c) => c.id === crust)!.label;
    toast.success(`${pizza.name} added`, {
      description: `${sizeLabel.label} ${sizeLabel.inches}" · ${crustLabel} · ${formatINR(price)}`,
    });
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={pizza.image}
          alt={pizza.name}
          loading="lazy"
          width={816}
          height={816}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
        />
        <div className="absolute inset-0 bg-fade-card" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-veg">
          <VegMark className="size-3.5" /> Veg
        </span>
        <span className="absolute right-3 top-3 rounded-full glass px-2.5 py-1 text-[11px] font-semibold text-amber">
          {pizza.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 pt-1">
        <div>
          <h3 className="text-xl font-semibold leading-tight">{pizza.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pizza.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pizza.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Size</legend>
          <div role="radiogroup" className="grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={size === s.id}
                onClick={() => setSize(s.id)}
                className={cn(
                  "rounded-xl px-2 py-1.5 text-center transition-all duration-200",
                  size === s.id ? "bg-flame text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="block text-xs font-semibold">{s.label}</span>
                <span className="block text-[11px] opacity-80">
                  {s.inches}" · {formatINR(pizza.prices[s.id])}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Crust</legend>
          <div role="radiogroup" className="flex flex-wrap gap-1.5">
            {CRUSTS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={crust === c.id}
                onClick={() => setCrust(c.id)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                  crust === c.id
                    ? "border-amber bg-amber/15 text-amber"
                    : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
                )}
              >
                {c.label}
                {c.surcharge > 0 && <span className="ml-1 opacity-80">+₹{c.surcharge}</span>}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "mt-auto flex h-12 items-center justify-between rounded-full pl-5 pr-2 font-semibold transition-all duration-300 active:scale-[0.98]",
            added ? "bg-veg text-primary-foreground" : "bg-flame text-primary-foreground hover:shadow-glow",
          )}
        >
          <span className="flex items-center gap-2">
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
            {added ? "Added!" : "Add to Cart"}
          </span>
          <span key={price} className="animate-pop rounded-full bg-background/20 px-3 py-1.5 font-display text-base">
            {formatINR(price)}
          </span>
        </button>
      </div>
    </article>
  );
}
