import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginRequest, LoginResponse } from "../types/auth.types";
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
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.accessToken) {
            tokenStorage.setToken(data.accessToken);
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    validateToken: builder.query<{ valid: boolean }, void>({
      query: () => "/auth/validate",
    }),
  }),
});

export const { useLoginMutation, useValidateTokenQuery } = authApi;
