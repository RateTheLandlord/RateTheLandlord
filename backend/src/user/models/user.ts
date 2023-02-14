export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  blocked: boolean;
  role: 'USER' | 'ADMIN';
  login_attempts: number;
  login_lockout: boolean;
  last_login_attempt: string;
}

export interface IGetUsers {
  id: number;
  name: string;
  email: string;
  blocked: boolean;
  role: 'USER' | 'ADMIN';
}
