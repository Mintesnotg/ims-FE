import { LoginResponse } from "types/response/userresponse/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";
import { RegisterValues } from "../../lib/schemas/useraccount/registration";
import { RegisterResponse } from "types/response/userresponse/registerresponse";
import axios from 'axios';


export async function registeruser(formdata: RegisterValues): Promise<RegisterResponse> {
  const { data } = await axios.post<RegisterResponse>(
    USER_ACCOUNT_ENDPOINTS.Register,
    formdata,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return data;
}