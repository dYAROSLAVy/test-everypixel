export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
  } | null;
}
