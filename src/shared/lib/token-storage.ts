const TOKEN_KEY = 'auth_token';
const USER_EMAIL_KEY = 'user_email';

export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },
  clearToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_EMAIL_KEY);
    }
  },
  getUserEmail: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(USER_EMAIL_KEY);
    }
    return null;
  },
  setUserEmail: (email: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_EMAIL_KEY, email);
    }
  }
};
