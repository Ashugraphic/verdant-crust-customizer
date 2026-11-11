import { CheckCircle2, Flame, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatINR } from "@/lib/pricing";

export type PlacedOrder = {
  id: string;
  name: string;
  address: string;
  items: number;
  total: number;
  placedAt: number;
};

const ETA_MS = 30 * 60 * 1000;

export function OrderConfirmation({ order, onClose }: { order: PlacedOrder | null; onClose: () => void }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!order) return;
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [order]);

  const remaining = order ? Math.max(0, order.placedAt + ETA_MS - now) : ETA_MS;
  const mm = String(Math.floor(remaining / 60000)).padStart(2, "0");
  const ss = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  const progress = 1 - remaining / ETA_MS;
  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <Dialog open={!!order} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-border bg-card p-0">
        <div className="relative bg-hero-glow px-6 pb-6 pt-8 text-center">
          <CheckCircle2 className="mx-auto size-10 animate-pop text-veg" />
          <DialogTitle className="mt-3 font-display text-3xl">Order confirmed!</DialogTitle>
          <DialogDescription className="mt-1">
            Thanks{order ? `, ${order.name.split(" ")[0]}` : ""}. Your pizzas are heading into the oven.
          </DialogDescription>

          <div className="relative mx-auto mt-6 size-44">
            <svg viewBox="0 0 160 160" className="size-full -rotate-90">
              <circle cx="80" cy="80" r={R} className="fill-none stroke-muted" strokeWidth="8" />
              <circle
                cx="80"
                cy="80"
                r={R}
                className="fill-none stroke-primary transition-[stroke-dashoffset] duration-1000 ease-linear"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-semibold tabular-nums" aria-live="polite">
                {mm}:{ss}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">est. arrival</span>
            </div>
          </div>
        </div>

        {order && (
          <div className="space-y-3 border-t border-border px-6 py-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono font-semibold">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>{order.items}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount (pay on delivery)</span>
              <span className="font-display text-lg font-semibold text-flame">{formatINR(order.total)}</span>
            </div>
            <p className="flex gap-2 rounded-2xl bg-surface p-3 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber" />
              {order.address}
            </p>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Flame className="size-3.5 text-primary" /> This is a demo order — nothing will actually be delivered.
            </p>
            <Button variant="flame" size="xl" className="w-full" onClick={onClose}>
              Back to menu
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
