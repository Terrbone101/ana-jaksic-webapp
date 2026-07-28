export interface Sellable {
  id: string;
  isTest?: boolean;
  amount: number; // smallest currency unit (cents)
  currency: string;
}
