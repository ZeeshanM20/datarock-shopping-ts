export interface Product {
  sku: string;
  name: string;
  price: number;
}

export interface PricingRule {
  apply(items: Map<string, number>, products: Map<string, Product>): number;
}
