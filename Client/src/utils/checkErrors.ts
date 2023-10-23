export const checkError = (error: any) => {
  if (error && "status" in error) {
    return (
      error.status === 500 ||
      error.status === "TIMEOUT_ERROR" ||
      error.status === "FETCH_ERROR" ||
      error.status === "PARSING_ERROR" ||
      error.status === "CUSTOM_ERROR"
    );
  } else {
    return false;
  }
};

type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error &&
    !!error.data &&
    typeof error.data === "object" &&
    "message" in error.data
  );
}

export function isCustomError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object"
  );
}
