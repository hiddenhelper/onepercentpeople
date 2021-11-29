import { User } from "./user";


export interface Resume {
  id?: number;
  file?: any;
  url: string;
  title?: string;
  user?: User;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
