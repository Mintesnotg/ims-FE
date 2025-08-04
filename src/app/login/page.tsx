import React from 'react'
import { Metadata } from 'next';
import Loginform from 'components/ui/user/loginform';    
import { redirect } from 'next/navigation';
import { authenticate } from 'services/auth';

import { LoginFormValues } from '../../../lib/schemas/useraccount/loginschema';
import { LoginResponse } from 'types/response/userresponse/loginresponse';
import { cookies } from 'next/headers';

export const metadata: Metadata = { title: 'Sign in' };

const Login = () => {
 
    async function loginaction(formdata: FormData): Promise<{ response: LoginResponse }> {
        'use server';

        const payload = Object.fromEntries(formdata) as LoginFormValues;
        
        try {
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

            return { response: result };
        } catch (error: any) {
            // Handle connection refused error
            if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
                const errorResponse: LoginResponse = {
                    isSuccess: false,
                    message: 'Unable to connect to the server. Please check if the backend is running.',
                    code: 'CONNECTION_ERROR',
                    errors: ['Server connection refused. Please try again later.'],
                    operationStatus: 'Failed' as any,
                    timestamp: new Date().toISOString()
                };
                return { response: errorResponse };
            }
            
            // Handle other network errors
            const errorResponse: LoginResponse = {
                isSuccess: false,
                message: 'Network error occurred. Please check your connection and try again.',
                code: 'NETWORK_ERROR',
                errors: [error.message || 'An unexpected error occurred'],
                operationStatus: 'Failed' as any,
                timestamp: new Date().toISOString()
            };
            return { response: errorResponse };
        }
    }

    return (
        <div>

            <Loginform action={loginaction} />


        </div>
    )
}

export default Login
