import axios from 'axios';
import { LoginResponse } from "types/response/userresponse/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";
import { LoginFormValues } from "../../lib/schemas/useraccount/loginschema";


export async function authenticate(formdata: LoginFormValues): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(
    USER_ACCOUNT_ENDPOINTS.Login,
    formdata,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return data;
}