import axios from "axios";

export const errorHandler = (error: unknown, funName = ""): string => {
  let errorMessage: string;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      const responseData = error.response.data;

      if (responseData?.error?.message) {
        const msg = responseData.error.message;

        // ⭐ HANDLE ARRAY OF ERRORS ⭐
        if (Array.isArray(msg)) {
          errorMessage = msg
            .map((e: any) => e.message || JSON.stringify(e))
            .join(", ");
        } else {
          errorMessage = msg;
        }
      } else if (responseData?.error?.code) {
        errorMessage = `${responseData.error.code}: ${
          responseData.error.message || "Authentication error"
        }`;
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      } else if (responseData?.err) {
        errorMessage = responseData.err;
      } else if (responseData?.error) {
        errorMessage = responseData.error;
      } else if (typeof responseData === "string") {
        errorMessage = responseData;
      } else {
        errorMessage =
          JSON.stringify(responseData) ||
          error.response.statusText ||
          "Unexpected response error";
      }
    } else if (error.request) {
      errorMessage = "No response received. Please check your network.";
    } else {
      errorMessage = error.message || "Unexpected Axios error occurred";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = "Something went wrong. Please try again later.";
  }

  console.error(`Error in ${funName}:`, error);
  return errorMessage;
};
