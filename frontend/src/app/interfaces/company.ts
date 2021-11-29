export interface Company {
  id?: number;

  name: string;
  description: string;
  url: string;
  logo_url?: string;
  industry?: string;
  phone?: string;
  // company_users?: [];

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
