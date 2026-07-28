import type { Sellable } from "../types";

export interface Course extends Sellable {
  image: string;
}

// Order here matches the "courses" array in each locale file (src/i18n/locales/*.json).
// The last entry is a demo/test course so bookings can be tried end-to-end before
// real courses go live - remove it once real dates and prices are confirmed.
export const courses: Course[] = [
  {
    id: "color-theory",
    amount: 45000,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/7fd575c3-ee16-49eb-b748-bf372bd129ef/florisomnia_stefankokovic_04.jpg",
  },
  {
    id: "shape-light",
    amount: 78000,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/d0fe040d-00d1-4e36-a0a1-fa4814eab06b/florisomnia_stefankokovic_06.jpg",
  },
  {
    id: "bridal",
    amount: 40000,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/49fa7e07-d170-42b7-bfab-7d712a9d8f6f/BUNDY_BRIDE_%28c%29_IsabellaAbel_01781+copy.jpg",
  },
  {
    id: "editorial",
    amount: 82000,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/d8b9c84b-f6e6-4c25-af3a-13b0f605c07a/LF.jpg",
  },
  {
    id: "online",
    amount: 18000,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/fe555edc-4b50-47e0-8597-9010b182817a/Bild+23.09.24+um+11.45.jpeg",
  },
  {
    id: "mentoring",
    amount: 25000,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/a6764c93-e434-4d45-98bd-b2928d8ff921/DSC_0508.JPG",
  },
  {
    id: "test-course",
    isTest: true,
    amount: 100,
    currency: "EUR",
    image:
      "https://images.squarespace-cdn.com/content/v1/644d5ee76d1f3424475d4cbe/c2ef98ca-11e3-40c2-a5ca-acdfacf5a469/MUD11+2.JPG",
  },
];
