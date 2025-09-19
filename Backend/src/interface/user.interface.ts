export interface User {
  id: number;
  email: string;
  password: string;
  fullName?: string;
  position?: string;
  profilePic?: string;
  aboutWork?: string;
}
