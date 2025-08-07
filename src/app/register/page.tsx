import Registration from "components/ui/user/registration";
import { RegisterResponse } from "types/response/userresponse/registerresponse";
import { RegisterValues } from "../../../lib/schemas/useraccount/registration";
import { registeruser } from "services/useraccount/registeruser";

import { redirect } from "next/navigation";


export default function Register() {


    async function registrationaction(formdata: FormData): Promise<{ response: RegisterResponse }> {
        'use server';

        const payload = Object.fromEntries(formdata) as RegisterValues;
        const result = await registeruser(payload);
        return { response: result.response };              // <‑‑ wrapped
    }

    return (
        <div>
            <Registration action={registrationaction} />
        </div>
    )
}