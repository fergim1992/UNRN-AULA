export type Admin = {
  id: string;
  role: number;
  name: string;
  email: string;
  username: string;
  password: string;
};

export type User = {
  id: string;
  role: number;
  name: string;
  last_name: string;
  dni: number;
  fingerprint: string | null;
  rfid: string | null;
  tag_rfid: string | null;
};

export type AccessActivity = {
  id: string;
  user_id: string;
  datetime: string;
  event: string;
  access_type: 'Huella digital' | 'RFID';
};

export type AccessActivityWithUser = {
  id: string;
  name: string;
  last_name: string;
  role: string;
  user_id: string;
  datetime: string;
  exit_datetime: string;
  event: string;
  location: string;
  access_type: 'Huella digital' | 'RFID';
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type UsersTable = {
  [key: string]: string | null;
  id: string;
  name: string;
  last_name: string;
  dni: string;
  role: string;
  fingerprint: string | null;
  rfid: string | null;
  tag_rfid: string | null;
  see: string;
  delete: string;
};

export type FormattedUsersTable = {
  id: string;
  name: string;
  last_name: string;
  dni: string;
};

export type UserField = {
  id: string;
  name: string;
  last_name: string;
  dni: string;
};
