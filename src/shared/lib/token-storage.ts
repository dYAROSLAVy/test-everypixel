const TOKEN_KEY = 'auth_token';
const USER_EMAIL_KEY = 'user_email';

const isClient = typeof window !== 'undefined';

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    return isClient ? localStorage.getItem(key) : null;
  },
  setItem: (key: string, value: string): void => {
    if (isClient) {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (isClient) {
      localStorage.removeItem(key);
    }
  },
};

export const tokenStorage = {
  getToken: (): string | null => safeLocalStorage.getItem(TOKEN_KEY),
  
  setToken: (token: string): void => safeLocalStorage.setItem(TOKEN_KEY, token),
  
  clearToken: (): void => {
    safeLocalStorage.removeItem(TOKEN_KEY);
    safeLocalStorage.removeItem(USER_EMAIL_KEY);
  },
  
  getUserEmail: (): string | null => safeLocalStorage.getItem(USER_EMAIL_KEY),
  
  setUserEmail: (email: string): void => safeLocalStorage.setItem(USER_EMAIL_KEY, email),
};
