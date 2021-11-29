import { Location } from "@interfaces/location";
import { Salary } from "@interfaces/salary";
import { User } from "@interfaces/user";
import { EnglishProficiency } from "@interfaces/english_proficiency";
import { EmploymentType } from "@interfaces/employment_type";

export interface TalentProfile {
  id?: number;
  bio?: string;
  english_proficiency_id?: number;
  location_id?: number;
  employment_type_preference_id?: number;
  user?: User;
  location?: Location;
  english_proficiency?: EnglishProficiency;
  employment_type_preference?: EmploymentType;
  expected_salary_id?: number;
  expected_salary?: Salary;
  created_at?: string;
  // updatedAt: string;
  // deletedAt: string;
}
