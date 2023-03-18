export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  image: 'https://cdn.pixabay.com/photo/2016/03/31/20/37/client-1295901_960_720.png';
  phone?: string;
  email: string;
  gender: 'Male' | 'Female';
  address: string;
  accountType?: 'saving' | 'checking';
  amount?: number;
  accountNumber: string;
  extraDetails: string;
}

export type CustomerFormData = Omit<
  Customer,
  'id' | 'image' | 'amount' | 'accountNumber'
>;
