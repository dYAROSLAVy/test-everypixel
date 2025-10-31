import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../../features/auth/api';
import { tokenStorage } from '../../shared/lib/token-storage';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: { email: string } | null;
}

const preloadedState = {
  auth: {
    token: tokenStorage.getToken(),
    isAuthenticated: !!tokenStorage.getToken(),
    user: tokenStorage.getUserEmail() ? { email: tokenStorage.getUserEmail()! } : null
  } as AuthState
};

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: (state = preloadedState.auth) => state
  },
  preloadedState: preloadedState as { auth: AuthState },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
