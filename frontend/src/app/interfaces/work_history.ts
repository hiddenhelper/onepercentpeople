import { Country } from "./country";
import { User } from "./user";

export interface WorkHistory {
  id: number;
  user_id?: number;
  job_title: string;
  company: string;
  city: string;
  country_id: number;
  current_employment: number;
  from_month: number;
  from_year: number;
  to_month: number;
  to_year: number;
  description: string;
  country?: Country;
  user?: User;
  created_at: string;
  // updatedAt: string;
  // deletedAt: string;
}
