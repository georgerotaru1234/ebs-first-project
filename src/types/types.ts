export interface RegisterType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export interface LoginType {
  email: string;
  password: string;
  error: string;
}
export interface PostType {
  id: number;
  title: string;
  body: string;
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
