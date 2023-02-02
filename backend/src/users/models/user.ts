export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  blocked: boolean;
  role: 'USER' | 'ADMIN';
}

export interface IGetUsers {
  id: number;
  name: string;
  email: string;
  blocked: boolean;
  role: 'USER' | 'ADMIN';
}
