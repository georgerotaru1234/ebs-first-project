export interface RegisterType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginType {
  email: string;
  password: string;
}
export interface PostType {
  id?: number;
  createdAt: string;
  title: string;
  body: string;
}
