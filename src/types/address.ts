
export interface UserAddress {
  id: string;
  user_id: string;
  address_name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export type NewUserAddress = Omit<UserAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
