
import { USER_ACCOUNT_ENDPOINTS } from "../../lib/apiendpoints";


export async function authenticate(formdata: FormData) {
debugger
    const username = formdata.get('username') as string;
    const password = formdata.get('password') as string;
  console.log(USER_ACCOUNT_ENDPOINTS.Login);
    debugger;
    const ok = await fetch(USER_ACCOUNT_ENDPOINTS.Login, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
    })

    if (!ok) return false;
    else return ok;



}