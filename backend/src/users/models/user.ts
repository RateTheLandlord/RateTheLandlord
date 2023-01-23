export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  blocked: boolean;
  admin: boolean;
}
