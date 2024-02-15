import { User } from "./user";

export interface Products {
  id?: string | null;
  name?: string | null;
  price?: number | null;
  description?: string | null;
  file?: string | null;
  category?: string | null;
  user: string | null;
}
