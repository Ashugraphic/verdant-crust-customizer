import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { lineUnitPrice, useCart } from "@/lib/cart";
import { PIZZAS } from "@/lib/pizzas";
import { COUPON_CODE, CRUSTS, FREE_DELIVERY_ABOVE, SIZES, formatINR, isValidCoupon } from "@/lib/pricing";
import { OrderConfirmation, type PlacedOrder } from "./OrderConfirmation";

export function CartDrawer() {
  const cart = useCart();
  const { lines, bill, open, setOpen } = cart;
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const applyCoupon = () => {
    if (isValidCoupon(code)) {
      cart.setCoupon(COUPON_CODE);
      setCouponError(null);
      setCode("");
    } else {
      setCouponError(code.trim() ? "That code isn't valid. Try CRUST20." : "Enter a coupon code.");
    }
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^(91)?\d{10}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Enter a valid 10-digit mobile number.";
    if (form.address.trim().length < 8) next.address = "Please enter a full delivery address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setOrder({
      id: `SC-${Math.floor(100000 + Math.random() * 900000)}`,
      name: form.name.trim(),
      address: form.address.trim(),
      items: cart.count,
      total: bill.total,
      placedAt: Date.now(),
    });
    cart.clear();
    setForm({ name: "", phone: "", address: "" });
    setOpen(false);
  };

  const freeLeft = FREE_DELIVERY_ABOVE + 1 - (bill.subtotal - bill.discount);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 overflow-hidden border-border bg-background p-0 sm:max-w-md [&>button]:hidden">
          <SheetHeader className="flex-row items-center justify-between border-b border-border px-6 py-5 text-left">
            <div>
              <SheetTitle className="font-display text-2xl">Your Cart</SheetTitle>
              <SheetDescription>{cart.count} {cart.count === 1 ? "pizza" : "pizzas"} · baked to order</SheetDescription>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <X className="size-4" />
            </button>
          </SheetHeader>

          {lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-surface">
                <ShoppingBag className="size-8 text-muted-foreground" />
              </span>
              <p className="font-display text-xl">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Pick a pizza from the menu to get started.</p>
              <Button asChild variant="flame" size="xl" onClick={() => setOpen(false)}>
                <a href="#menu">Browse Menu</a>
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-border px-6">
                {lines.map((l) => {
                  const pizza = PIZZAS.find((p) => p.id === l.pizzaId);
                  if (!pizza) return null;
                  const size = SIZES.find((s) => s.id === l.size)!;
                  const crust = CRUSTS.find((c) => c.id === l.crust)!;
                  const unit = lineUnitPrice(l);
                  return (
                    <li key={l.key} className="flex animate-in fade-in slide-in-from-right-4 gap-4 py-4">
                      <img src={pizza.image} alt="" width={816} height={816} className="size-16 shrink-0 rounded-2xl object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{pizza.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {size.label} {size.inches}" · {crust.label} · {formatINR(unit)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => cart.remove(l.key)}
                            aria-label={`Remove ${pizza.name}`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-border">
                            <button type="button" onClick={() => cart.dec(l.key)} aria-label="Decrease quantity" className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-accent">
                              <Minus className="size-3.5" />
                            </button>
                            <span key={l.qty} className="w-7 animate-pop text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                            <button type="button" onClick={() => cart.inc(l.key)} aria-label="Increase quantity" className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-accent">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-lg font-semibold tabular-nums">{formatINR(unit * l.qty)}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mx-6 rounded-2xl border border-border bg-surface p-4">
                {cart.coupon ? (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      <Tag className="size-4 text-veg" />
                      <span><strong className="text-amber">{cart.coupon}</strong> applied — 20% off</span>
                    </span>
                    <button type="button" onClick={() => cart.setCoupon(null)} className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Label htmlFor="coupon" className="text-xs uppercase tracking-widest text-muted-foreground">Coupon code</Label>
                    <div className="mt-2 flex gap-2">
                      <Input
                        id="coupon"
                        value={code}
                        onChange={(e) => { setCode(e.target.value); setCouponError(null); }}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                        placeholder="Try CRUST20"
                        className="h-10 rounded-full bg-background uppercase"
                      />
                      <Button type="button" variant="flame" className="h-10 rounded-full px-5" onClick={applyCoupon}>
                        Apply
                      </Button>
                    </div>
                    {couponError && <p className="mt-2 text-xs text-destructive">{couponError}</p>}
                  </>
                )}
              </div>

              <dl className="mx-6 mt-4 space-y-2.5 text-sm">
                <Row label="Subtotal" value={formatINR(bill.subtotal)} />
                <Row label="Promo discount" value={bill.discount ? `− ${formatINR(bill.discount)}` : formatINR(0)} highlight={bill.discount > 0} />
                <Row label="GST (5%)" value={formatINR(bill.gst)} />
                <Row label="Delivery fee" value={bill.delivery === 0 ? "FREE" : formatINR(bill.delivery)} highlight={bill.delivery === 0} />
                {bill.delivery > 0 && freeLeft > 0 && (
                  <p className="text-xs text-amber">Add {formatINR(freeLeft)} more for free delivery.</p>
                )}
                <div className="flex items-baseline justify-between border-t border-dashed border-border pt-3">
                  <dt className="font-semibold">Total</dt>
                  <dd key={bill.total} className="animate-pop font-display text-2xl font-semibold text-flame tabular-nums">{formatINR(bill.total)}</dd>
                </div>
              </dl>

              <form onSubmit={placeOrder} noValidate className="mx-6 mb-6 mt-6 space-y-3 rounded-2xl border border-border bg-surface p-4">
                <p className="font-display text-lg font-semibold">Delivery details</p>
                <Field id="name" label="Name" error={errors.name}>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" autoComplete="name" className="bg-background" />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone}>
                  <Input id="phone" type="tel" inputMode="numeric" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" autoComplete="tel" className="bg-background" />
                </Field>
                <Field id="address" label="Delivery address" error={errors.address}>
                  <Textarea id="address" rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Flat, street, area, city" autoComplete="street-address" className="resize-none bg-background" />
                </Field>
                <Button type="submit" variant="flame" size="xl" className="w-full justify-between">
                  <span>Place Demo Order</span>
                  <span className="font-display">{formatINR(bill.total)}</span>
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">Demo only — no payment is taken.</p>
              </form>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <OrderConfirmation order={order} onClose={() => setOrder(null)} />
    </>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean | undefined }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={highlight ? "font-semibold text-veg tabular-nums" : "tabular-nums"}>{value}</dd>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
