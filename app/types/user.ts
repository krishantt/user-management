export type Role = "ADMIN" | "USER";
export interface User {
  id: string;
  name: string;
  email: string;
  dob: Date;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
