
import { LoginResponse } from "types/response/userresponse/loginresponse";
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";
import { RegisterValues } from "../../lib/schemas/useraccount/registration";
import { RegisterResponse } from "types/response/userresponse/registerresponse";


export async function registeruser(formdata: RegisterValues): Promise<RegisterResponse> {
debugger;

    const result = await fetch(USER_ACCOUNT_ENDPOINTS.Register, {
        method: 'POST',
        body: JSON.stringify(formdata),
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    })
  const data = (await result.json()) as RegisterResponse;
  return data;
}