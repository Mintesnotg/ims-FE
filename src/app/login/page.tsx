import React from 'react'
import { Metadata } from 'next';
import Loginform from 'components/ui/user/loginform';    
import { authenticate } from 'services/useraccount/auth';

import { LoginFormValues } from '../../../lib/schemas/useraccount/loginschema';
import { LoginResponse } from 'types/response/userresponse/loginresponse';
import { cookies } from 'next/headers';
import { OperationStatus } from 'types/enums/systemenums';

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
            } 
            return { response: result };
        } catch (error: unknown) {
            // If backend sent a response, return it directly
            if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
                return { response: error.response.data as LoginResponse };
            }

            // If no backend response (e.g., network error), return a generic error
            const errorResponse: LoginResponse = {
                isSuccess: false,
                message: 'Unable to connect to the server. Please check if the backend is running.',
                code: 'CONNECTION_ERROR',
                errors: ['Server connection refused. Please try again later.'],
                operationStatus: OperationStatus.FAILED,
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
