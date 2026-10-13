export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    companyId: string;
    role: string;
    name: string;
    email: string;
  };
}
