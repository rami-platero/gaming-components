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