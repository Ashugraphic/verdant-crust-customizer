import { ArrowRight, Flame, Leaf, Timer } from "lucide-react";
import heroPizza from "@/assets/hero-pizza.jpg";
import { Button } from "@/components/ui/button";
import { CouponBanner } from "./Offers";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border border-veg/40 bg-veg/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-veg">
            <Leaf className="size-3.5" /> 100% Vegetarian
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            Freshly Baked,
            <br />
            <span className="italic text-flame">Delivered Hot</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Pure-veg pizzas baked on stone at 450°C — with dough slow-proofed for 48 hours and
            fresh mozzarella pulled every morning.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="flame" size="xl">
              <a href="#menu">
                View Menu <ArrowRight className="size-5" />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#rate-chart">See Rate Chart</a>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
            {[
              { icon: Flame, k: "Stone oven", v: "450°C" },
              { icon: Timer, k: "Delivery", v: "30 min" },
              { icon: Leaf, k: "Pizzas", v: "20 veg" },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="rounded-2xl border border-border bg-surface/60 p-3">
                <Icon className="size-4 text-amber" />
                <dd className="mt-2 font-display text-xl font-semibold">{v}</dd>
                <dt className="text-xs text-muted-foreground">{k}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-in fade-in zoom-in-95 duration-1000">
          <div className="absolute -inset-6 rounded-full bg-flame opacity-20 blur-3xl" />
          <div className="relative aspect-square overflow-hidden rounded-full border border-border shadow-card">
            <img
              src={heroPizza}
              alt="Stone-baked margherita pizza with fresh mozzarella and basil"
              width={1600}
              height={1200}
              className="size-full animate-spin-slow object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-0 animate-float sm:-left-6">
            <CouponBanner compact />
          </div>
        </div>
      </div>
    </section>
  );
}
