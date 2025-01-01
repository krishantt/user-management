export type RegisterForm = {
  email: string;
  password: string;
  name: string;
  dob: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type UpdateForm = {
  email: string;
  name: string;
  dob: string;
  role: string;
};
