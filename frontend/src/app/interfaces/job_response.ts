import { Job } from "./job";
import { User } from "./user";

export interface JobResponse {
  id?: number;
  user_id?: number;
  job_id?: number;
  job?: Job;
  employer_review_status?: number;
  user?: User;

  paused_at?: any;
  created_at?: string;
  deleted_at?: string;

  // applicants: number;
}
