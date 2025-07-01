import React from 'react'
import { Metadata } from 'next';
import Loginform from 'components/ui/loginform';    
import { redirect } from 'next/navigation';
import { authenticate } from 'services/auth';
import { USER_ACCOUNT_ENDPOINTS } from '../../../lib/apiendpoints';
import { LoginFormValues } from '../../../lib/schemas/useraccount/loginschema';
import { LoginResponse } from 'types/response/loginresponse';
import { cookies } from 'next/headers';

export const metadata: Metadata = { title: 'Sign in' };

const Login = () => {
 
    
    async function loginaction(formdata: FormData): Promise<{ response: LoginResponse }> {
        'use server';

        const payload = Object.fromEntries(formdata) as LoginFormValues;
        const result = await authenticate(payload);
        if (result.isSuccess && result.data?.accessToken) {
            (await cookies()).set('accessToken', result.data.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                path: '/',
            });
            redirect('/dashboard');             // never reaches next line
        }
        debugger;
        return { response: result };              // <‑‑ wrapped
    }

    return (
        <div>

            <Loginform action={loginaction} />


        </div>
    )
}

export default Login
