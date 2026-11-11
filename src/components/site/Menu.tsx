import { useState } from "react";
import { CATEGORIES, PIZZAS } from "@/lib/pizzas";
import { cn } from "@/lib/utils";
import { PizzaCard } from "./PizzaCard";

export function Menu() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const list = active === "All" ? PIZZAS : PIZZAS.filter((p) => p.category === active);

  return (
    <section id="menu" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">The Menu</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Twenty pizzas. Zero meat.</h2>
          <p className="mt-3 text-muted-foreground">
            Pick a size and crust — the price updates as you go.
          </p>
        </div>
        <div role="tablist" aria-label="Pizza categories" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const n = c === "All" ? PIZZAS.length : PIZZAS.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                role="tab"
                type="button"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  active === c
                    ? "border-transparent bg-flame text-primary-foreground shadow-glow"
                    : "border-border bg-surface text-muted-foreground hover:border-primary/60 hover:text-foreground",
                )}
              >
                {c} <span className="ml-1 opacity-70">{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <div
            key={p.id}
            className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
            style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
          >
            <PizzaCard pizza={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
