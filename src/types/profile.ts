
export interface Profile {
  id: string;
  name: string | null;
  email: string;
  mobile_number: string | null;
  created_at: string;
  updated_at: string;
  address_street: string | null;
  address_city: string | null;
  address_state: string | null;
  address_postal_code: string | null;
  address_country: string | null;
}
