import React from 'react'

import { Metadata } from 'next';
import Loginform from 'components/ui/loginform';     // client component
// import { authenticate } from '@/lib/auth';               // server helper
import { redirect } from 'next/navigation';

import { authenticate } from 'services/auth';
export const metadata: Metadata = { title: 'Sign in' };
import { USER_ACCOUNT_ENDPOINTS } from '../../../lib/apiendpoints';

const Login = () => {
    debugger
    console.log(USER_ACCOUNT_ENDPOINTS.Login)
    async function loginaction(formdata: FormData) {
        'use server';
        const ok = await authenticate(formdata)
        if (ok) redirect('/dashboard');          // server‑side redirect, no flash of /login
        return { error: 'Invalid credentials' };
    }

    return (
        <div>

            <Loginform action={loginaction} />


        </div>
    )
}

export default Login
