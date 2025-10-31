import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

interface ApiErrorData {
  message?: string;
}

export const getApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
  defaultMessage: string = "An error occurred"
): string | null => {
  if (!error) return null;

  if ("data" in error && typeof error.data === "object" && error.data) {
    const errorData = error.data as ApiErrorData;
    if (errorData.message) {
      return errorData.message;
    }
  }

  if ("message" in error && error.message) {
    return error.message;
  }

  return defaultMessage;
};
