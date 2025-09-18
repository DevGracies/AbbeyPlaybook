export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
};

export type AuthState = {
  token: string | null;
  user: User | null;
};