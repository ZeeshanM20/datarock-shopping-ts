import { PricingRule, Product } from "./types";

export class BulkDiscountRule implements PricingRule {
  constructor(private sku: string, private minQuantity: number, private discountedPrice: number) {}

  apply(items: Map<string, number>, products: Map<string, Product>): number {
    if (!items.has(this.sku) || items.get(this.sku)! < this.minQuantity) {
      return 0;
    }

    const quantity = items.get(this.sku)!;
    const originalPrice = products.get(this.sku)!.price;
    const discount = (originalPrice - this.discountedPrice) * quantity;

    return discount;
  }
}

export class BuyXGetYFreeRule implements PricingRule {
  constructor(private sku: string, private requiredQuantity: number, private freeQuantity: number) {}

  apply(items: Map<string, number>, products: Map<string, Product>): number {
    if (!items.has(this.sku) || items.get(this.sku)! < this.requiredQuantity) {
      return 0;
    }

    const quantity = items.get(this.sku)!;
    const freeItems = Math.floor(quantity / this.requiredQuantity) * this.freeQuantity;
    const discount = freeItems * products.get(this.sku)!.price;

    return discount;
  }
}

export class FreeItemWithPurchaseRule implements PricingRule {
  constructor(private requiredSku: string, private freeSku: string) {}

  apply(items: Map<string, number>, products: Map<string, Product>): number {
    if (!items.has(this.requiredSku)) {
      return 0;
    }

    const quantity = items.get(this.requiredSku)!;
    const freeItems = Math.min(quantity, items.get(this.freeSku) || 0);
    const discount = freeItems * products.get(this.freeSku)!.price;

    return discount;
  }
}