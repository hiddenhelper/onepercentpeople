import { User } from "@interfaces/user";
import { Job } from "@interfaces/job";
import { JobResponse } from "@interfaces/job_response";

export interface Chat {
  id?: number;
  employer_user_id: number;
  talent_user_id: number;

  employer_user?: User;
  talent_user?: User;

  created_at?: string;
  updatedAt?: string;
  deletedAt?: string;
}
