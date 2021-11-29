import { Education } from "./education";
import { TalentProfile } from "./talent_profile";
import { Video } from "./video";
import { WorkHistory } from "./work_history";
import { Country } from "./country";
import { Resume } from "./resume";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  account_type: number;
  talent_profiles?: TalentProfile[];
  videos?: Video[];
  education?: Education[];
  work_history?: WorkHistory[];
  resumes?: Resume[];
  profile_photo_url?: string;
  country_id?: number;
  country?: Country;
  city?: string;
  finished_onboarding_at: string;
  created_at: string;
  updated_at: string;
  // deleted_at: string;
}
