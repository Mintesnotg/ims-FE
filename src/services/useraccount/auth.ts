import { LoginResponse } from "@/types/response/userresponse/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../../lib/apiendpoints";
import { LoginFormValues } from "../../../lib/schemas/useraccount/loginschema";
import { httpPost } from "../http";

export async function authenticate(formdata: LoginFormValues): Promise<LoginResponse> {
  const data = await httpPost<LoginResponse>(
    USER_ACCOUNT_ENDPOINTS.Login,
    formdata
  );
  return data;
}