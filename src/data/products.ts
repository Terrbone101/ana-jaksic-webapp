import type { Sellable } from "../types";

export interface Product extends Sellable {
  image: string;
}

// Demo shop items so the purchase flow can be tried end-to-end before real
// products (and their Stripe Payment Links) are added - see .env.example.
export const products: Product[] = [
  {
    id: "test-product-palette",
    isTest: true,
    amount: 100,
    currency: "EUR",
    image:
      "https://images.pexels.com/photos/32388555/pexels-photo-32388555/free-photo-of-colorful-makeup-palettes-with-brushes.jpeg?cs=tinysrgb&w=800",
  },
  {
    id: "test-product-brushes",
    isTest: true,
    amount: 100,
    currency: "EUR",
    image:
      "https://images.pexels.com/photos/6148/brush-makeup-make-up-brushes.jpg?cs=tinysrgb&w=800",
  },
  {
    id: "test-product-workbook",
    isTest: true,
    amount: 100,
    currency: "EUR",
    image:
      "https://images.pexels.com/photos/574283/pexels-photo-574283.jpeg?cs=tinysrgb&w=800",
  },
];
