import { LoginResponse } from "types/response/userresponse/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";
import { RegisterValues } from "../../lib/schemas/useraccount/registration";
import { RegisterResponse } from "types/response/userresponse/registerresponse";
import axios from 'axios';

export async function registeruser(formdata: RegisterValues): Promise<{response: RegisterResponse}> {
  try {
    const { data } = await axios.post<RegisterResponse>(
      USER_ACCOUNT_ENDPOINTS.Register,
      formdata,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return { response: data };
  } catch (error: any) {

      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        const errorResponse: RegisterResponse = {
          isSuccess: false,
          message: 'Unable to connect to the server. Please check if the backend is running.',
          code: 'CONNECTION_ERROR',
          errors: ['Server connection refused. Please try again later.'],
          operationStatus: 'Failed' as any,
          timestamp: new Date().toISOString()
      };
      return { response: errorResponse };
      }
      
      if (error.response) {
        // Server responded with error status

        const errorResponse: RegisterResponse = {
          isSuccess: false,
          message: error.response.data?.message || `Server error: ${error.response.status}`,
          data: undefined,
          operationStatus: 1,
          timestamp: new Date().toISOString()
      };
      return { response: errorResponse };
      }
      
      if (error.request) {
    
        const errorResponse: RegisterResponse = {
          isSuccess: false,
          message: "Network error: No response from server. Please check your connection and try again.",
          data: undefined,
          operationStatus: 1,
          timestamp: new Date().toISOString()
      };
      return { response: errorResponse };
      }
    const errorResponse: RegisterResponse = {
      isSuccess: false,
      message: "An unexpected error occurred. Please try again later.",
      data: undefined,
      operationStatus: 1,
      timestamp: new Date().toISOString()
  };
  return { response: errorResponse };
  }
}