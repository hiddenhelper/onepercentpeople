import { Currency } from "./currency";

export interface Salary {
  id?: number;
  period?: string;
  min?: number;
  max?: number;
  currency_id?: number;
  currency?: Currency;

  created_at?: string;
  // updatedAt: string;
  // deletedAt: string;
}
