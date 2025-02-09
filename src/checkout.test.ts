import { Checkout } from "./checkout";
import { BulkDiscountRule, BuyXGetYFreeRule, FreeItemWithPurchaseRule } from "./pricingRules";
import { productCatalogue } from "./index";

describe("Checkout System", () => {
  const pricingRules = [
    new BuyXGetYFreeRule("atv", 3, 1),
    new BulkDiscountRule("ipd", 5, 499.99),
    new FreeItemWithPurchaseRule("mbp", "vga"),
  ];

  let co: Checkout;

  beforeEach(() => {
    co = new Checkout(pricingRules, productCatalogue);
  });

  // Scenario tests
  describe("Basic Scenarios", () => {
    test("Scenario 1: atv, atv, atv, vga", () => {
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      co.scan("vga");
      expect(co.total()).toBe(249.00);
    });

    test("Scenario 2: atv, ipd, ipd, atv, ipd, ipd, ipd", () => {
      co.scan("atv");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("atv");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      expect(co.total()).toBe(2718.95);
    });

    test("Scenario 3: mbp, vga, ipd", () => {
      co.scan("mbp");
      co.scan("vga");
      co.scan("ipd");
      expect(co.total()).toBe(1949.98);
    });
  });

  // Discount application tests
  describe("Discount Application", () => {
    test("Apply 3-for-2 discount on Apple TVs (3 ATVs)", () => {
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      expect(co.total()).toBe(2 * 109.50);
    });

    test("Apply 3-for-2 discount on 5 Apple TVs", () => {
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      expect(co.total()).toBe(4 * 109.50);
    });

    test("Apply bulk discount on iPads (5 or more)", () => {
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      expect(co.total()).toBe(5 * 499.99);
    });

    test("Apply bulk discount on iPads and 3-for-2 discount on Apple TVs", () => {
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      expect(co.total()).toBeCloseTo(2 * 109.50 + 5 * 499.99, 2);
    });
  });

  // Free item tests
  describe("Free Item Scenarios", () => {
    test("Free VGA with each MacBook Pro", () => {
      co.scan("mbp");
      co.scan("vga");
      expect(co.total()).toBe(1399.99);
    });

    test("Apply free VGA with MacBook Pro and bulk discount on iPads", () => {
      co.scan("mbp");
      co.scan("vga");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      co.scan("ipd");
      expect(co.total()).toBeCloseTo(1399.99 + 5 * 499.99, 2);
    });

    test("Apply free VGA with MacBook Pro and 3-for-2 discount on Apple TVs", () => {
      co.scan("mbp");
      co.scan("vga");
      co.scan("atv");
      co.scan("atv");
      co.scan("atv");
      expect(co.total()).toBe(1399.99 + 2 * 109.50);
    });
  });

  // Edge cases
  describe("Edge Cases", () => {
    test("No items scanned (Total should be 0)", () => {
      expect(co.total()).toBe(0);
    });

    test("No discount when conditions are not met (less than 3 ATVs)", () => {
      co.scan("atv");
      co.scan("atv");
      expect(co.total()).toBe(2 * 109.50);
    });

    test("No discount when conditions are not met", () => {
      co.scan("atv");
      co.scan("ipd");
      co.scan("mbp");
      expect(co.total()).toBe(109.50 + 549.99 + 1399.99);
    });

    test("Invalid SKU", () => {
      expect(() => co.scan("invalid")).toThrowError("Invalid SKU: invalid");
    });
  });
});
