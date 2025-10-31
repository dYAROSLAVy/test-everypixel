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

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}
