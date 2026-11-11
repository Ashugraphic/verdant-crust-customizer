import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { PIZZAS } from "@/lib/pizzas";
import { SIZES, formatINR } from "@/lib/pricing";
import { VegMark } from "./VegMark";

export function RateChart() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return PIZZAS;
    return PIZZAS.filter((p) =>
      [p.name, p.category, ...p.tags].some((s) => s.toLowerCase().includes(term)),
    );
  }, [q]);

  return (
    <section id="rate-chart" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Rate Chart</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Every pizza, every size</h2>
          <p className="mt-3 text-muted-foreground">Cheese Burst crust: +₹60 on any size.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pizza, category or tag…"
            aria-label="Search rate chart"
            className="h-12 rounded-full bg-surface pl-11"
          />
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4 font-semibold">Pizza</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                {SIZES.map((s) => (
                  <th key={s.id} className="px-5 py-4 text-right font-semibold">
                    {s.label} <span className="normal-case opacity-70">{s.inches}"</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40">
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-3">
                      <img src={p.image} alt="" loading="lazy" width={816} height={816} className="size-9 rounded-full object-cover" />
                      <span className="font-medium">{p.name}</span>
                      <VegMark className="size-3.5" />
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{p.category}</td>
                  {SIZES.map((s) => (
                    <td key={s.id} className="px-5 py-3.5 text-right font-display text-base font-semibold tabular-nums">
                      {formatINR(p.prices[s.id])}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-muted-foreground">
                    No pizzas match “{q}”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
