
import { LoginResponse } from "types/response/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";
import { LoginFormValues } from "../../lib/schemas/useraccount/loginschema";


export async function authenticate(formdata: LoginFormValues): Promise<LoginResponse> {
debugger;

    const result = await fetch(USER_ACCOUNT_ENDPOINTS.Login, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    })
  const data = (await result.json()) as LoginResponse;
  return data;



}