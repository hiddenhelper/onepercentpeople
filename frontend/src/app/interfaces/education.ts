import { Country } from "./country";
import { EducationLevel } from "./education_level";
import { User } from "./user";

export interface Education {
  id: number;
  user_id?: number;
  education_level_id: number;
  field_of_study: string;
  school_name: string;
  city: string;
  country_id: number;
  current_school: string;
  from_month: number;
  from_year: number;
  to_month: number;
  to_year: number;
  description: string;
  country?: Country;
  education_level?: EducationLevel;

  user?: User;

  created_at: string;
  // updatedAt: string;
  // deletedAt: string;
}
