import { Product, PricingRule } from "./types";

export class Checkout {
  private cart: Map<string, number> = new Map();

  constructor(private pricingRules: PricingRule[], private products: Map<string, Product>) {}

  scan(sku: string): void {
    if (!this.products.has(sku)) {
      throw new Error(`Invalid SKU: ${sku}`);
    }
    this.cart.set(sku, (this.cart.get(sku) || 0) + 1);
  }

  total(): number {
    let total = 0;
    
    // Calculate total without discounts
    for (const [sku, quantity] of this.cart) {
      total += (this.products.get(sku)!.price * quantity);
    }

    // Apply pricing rules
    for (const rule of this.pricingRules) {
      total -= rule.apply(this.cart, this.products);
    }

    return parseFloat(total.toFixed(2)); 
  }
}