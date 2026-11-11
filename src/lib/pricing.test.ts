import { describe, expect, it } from "vitest";
import { computeBill, isValidCoupon, unitPrice } from "./pricing";

const prices = { regular: 199, medium: 349, large: 499 };

describe("pricing rules", () => {
  it("Cheese Burst crust adds ₹60", () => {
    expect(unitPrice(prices, "medium", "cheese-burst")).toBe(409);
    expect(unitPrice(prices, "medium", "thin")).toBe(349);
  });

  it("CRUST20 takes 20% off the subtotal", () => {
    expect(computeBill(1000, true).discount).toBe(200);
    expect(computeBill(1000, false).discount).toBe(0);
  });

  it("coupon code is CRUST20 and case-insensitive", () => {
    expect(isValidCoupon("crust20")).toBe(true);
    expect(isValidCoupon("CRUST10")).toBe(false);
  });

  it("adds 5% GST on the discounted amount", () => {
    expect(computeBill(1000, true).gst).toBe(40);
  });

  it("charges ₹40 delivery at or under ₹500 and free above", () => {
    expect(computeBill(400, false).delivery).toBe(40);
    expect(computeBill(500, false).delivery).toBe(40);
    expect(computeBill(600, false).delivery).toBe(0);
  });

  it("final total = subtotal − discount + GST + delivery", () => {
    expect(computeBill(400, false).total).toBe(400 + 20 + 40);
    expect(computeBill(1000, true).total).toBe(800 + 40 + 0);
  });
});
