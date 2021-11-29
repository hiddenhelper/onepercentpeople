import { Company } from "./company";
import { EmploymentType } from "./employment_type";
import { JobResponse } from "./job_response";
import { Role } from "./role";

export interface Job {
  id?: number;
  // user_id: number;
  // company_id: number;
  title: string;
  role_id: number;
  employment_type_id: number;
  location?: string;
  description: string;
  salary_period: string;
  min_salary: number;
  max_salary: number;
  salary_currency_id: number;

  posted_at?: string;

  role?: Role;
  employment_type?: EmploymentType;
  company?: Company;
  job_responses?: JobResponse[];

  paused_at?: any;
  created_at?: string;
  deleted_at?: string;

  // applicants: number;
}
