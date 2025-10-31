import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth.types";
import { tokenStorage } from "../../../shared/lib/token-storage";

const API_URL = "https://api.example.com";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = tokenStorage.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      async queryFn(arg) {
        const { email, password } = arg;
        await new Promise((r) => setTimeout(r, 600));
        if (email && password) {
          const data: LoginResponse = {
            accessToken: `mock-jwt-token-${Date.now()}`,
            user: { 
              id: Date.now().toString(), 
              email 
            },
          };
          tokenStorage.setToken(data.accessToken);
          tokenStorage.setUserEmail(email);
          return { data };
        }
        return {
          error: {
            status: 401,
            data: { message: "Invalid credentials" },
          } as FetchBaseQueryError,
        };
      },
    }),
    validateToken: builder.query<{ valid: boolean }, void>({
      query: () => "/auth/validate",
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      async queryFn(arg) {
        await new Promise((r) => setTimeout(r, 600));
        const accessToken = `mock-jwt-token-${Date.now()}`;
        const user = {
          id: Date.now().toString(),
          email: arg.email,
        };
        tokenStorage.setToken(accessToken);
        tokenStorage.setUserEmail(arg.email);
        return { 
          data: {
            ...user,
            accessToken,
            user
          } 
        };
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: () => {
        tokenStorage.clearToken();
        return { data: undefined };
      },
    }),
  }),
});

export const { 
  useLoginMutation, 
  useValidateTokenQuery, 
  useRegisterMutation,
  useLogoutMutation 
} = authApi;
