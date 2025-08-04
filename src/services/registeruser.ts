import { LoginResponse } from "types/response/userresponse/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";
import { RegisterValues } from "../../lib/schemas/useraccount/registration";
import { RegisterResponse } from "types/response/userresponse/registerresponse";
import axios from 'axios';

export async function registeruser(formdata: RegisterValues): Promise<RegisterResponse> {
  try {
    const { data } = await axios.post<RegisterResponse>(
      USER_ACCOUNT_ENDPOINTS.Register,
      formdata,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        return {
          isSuccess: false,
          message: "Network error: Unable to connect to the server. Please check if the backend server is running.",
          data: undefined,
          operationStatus: 1,
          timestamp: new Date().toISOString()
        };
      }
      
      if (error.response) {
        // Server responded with error status
        return {
          isSuccess: false,
          message: error.response.data?.message || `Server error: ${error.response.status}`,
          data: undefined,
          operationStatus: 1,
          timestamp: new Date().toISOString()
        };
      }
      
      if (error.request) {
        // Request was made but no response received
        return {
          isSuccess: false,
          message: "Network error: No response from server. Please check your connection and try again.",
          data: undefined,
          operationStatus: 1,
          timestamp: new Date().toISOString()
        };
      }
    }
    
    // Generic error fallback
    return {
      isSuccess: false,
      message: "An unexpected error occurred. Please try again later.",
      data: undefined,
      operationStatus: 1,
      timestamp: new Date().toISOString()
    };
  }
}