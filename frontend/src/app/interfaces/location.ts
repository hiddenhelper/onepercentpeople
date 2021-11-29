import { Country } from "@interfaces/country";

export interface Location {
  id: number;
  city?: string;
  state?: number;
  country_id?: number;
  zip?: string;

  country?: Country;

  created_at: string;
  // createdAt: string;
  // deletedAt: string;
}
