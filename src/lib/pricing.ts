export type SizeId = "regular" | "medium" | "large";
export type CrustId = "classic-pan" | "thin" | "cheese-burst";

export const SIZES: { id: SizeId; label: string; inches: number }[] = [
  { id: "regular", label: "Regular", inches: 7 },
  { id: "medium", label: "Medium", inches: 10 },
  { id: "large", label: "Large", inches: 12 },
];

export const CRUSTS: { id: CrustId; label: string; surcharge: number }[] = [
  { id: "classic-pan", label: "Classic Pan", surcharge: 0 },
  { id: "thin", label: "Thin Crust", surcharge: 0 },
  { id: "cheese-burst", label: "Cheese Burst", surcharge: 60 },
];

export const COUPON_CODE = "CRUST20";
export const COUPON_RATE = 0.2;
export const GST_RATE = 0.05;
export const DELIVERY_FEE = 40;
export const FREE_DELIVERY_ABOVE = 500;

export type PriceTable = Record<SizeId, number>;

export function unitPrice(prices: PriceTable, size: SizeId, crust: CrustId): number {
  const surcharge = CRUSTS.find((c) => c.id === crust)?.surcharge ?? 0;
  return prices[size] + surcharge;
}

export function isValidCoupon(code: string): boolean {
  return code.trim().toUpperCase() === COUPON_CODE;
}

export type Bill = {
  subtotal: number;
  discount: number;
  gst: number;
  delivery: number;
  total: number;
};

/**
 * Bill order: subtotal → coupon discount → 5% GST on the discounted amount →
 * delivery fee (free when the discounted amount is over the threshold).
 * All amounts are whole rupees.
 */
export function computeBill(subtotal: number, couponApplied: boolean): Bill {
  if (subtotal <= 0) return { subtotal: 0, discount: 0, gst: 0, delivery: 0, total: 0 };
  const discount = couponApplied ? Math.round(subtotal * COUPON_RATE) : 0;
  const afterDiscount = subtotal - discount;
  const gst = Math.round(afterDiscount * GST_RATE);
  const delivery = afterDiscount > FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  return { subtotal, discount, gst, delivery, total: afterDiscount + gst + delivery };
}

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
