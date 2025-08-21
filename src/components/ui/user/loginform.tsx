// import { useForm } from "react-hook-form";
"use client";

import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../../../lib/schemas/useraccount/loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginResponse } from "types/response/userresponse/loginresponse";
import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

type Props = {
    action: (fd: FormData) => Promise<{ response?: LoginResponse  | undefined }>;
};

export default function Loginform({ action, }: Props) {
 
        const arrow = `->`
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({resolver:zodResolver(loginSchema)});
    const [loginerror, setLoginError] = useState("")
    const onSubmit = async (values: LoginFormValues) => {



        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }

        const {response} = await action(formData);
        debugger;
        if (!response?.isSuccess) {
              setLoginError(response?.message ?? 'Unknown error, please try again');

        } else {
            redirect('/dashboard');
        }

    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-8 px-4">
            <div className="w-full max-w-md mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl bg-white/90 p-10 shadow-2xl border border-blue-100 backdrop-blur-md">
                    <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm">Sign in to your account</h2>

                    <label className="block">
                        <span className="text-sm font-semibold text-blue-700">Username</span>
                        <input
                            onKeyDown={() => setLoginError('')}
                            {...register('email')}
                            className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                        )}
                    </label>

                    <label className="block">
                        <span className="text-sm font-semibold text-blue-700">Password</span>
                        <input
                            onKeyDown={() => setLoginError('')}
                            type="password"
                            {...register('password')}
                            className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                        )}
                    </label>

                    {errors.root && (
                        <p className="mt-2 text-center text-sm text-red-600">
                            {errors.root.message}
                        </p>
                    )}

                    {loginerror && (
                        <p className="mt-2 text-center text-sm text-red-600">
                            {loginerror}
                        </p>
                    )}

                    <button
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md hover:bg-blue-700 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {isSubmitting ? 'Signing in…' : 'Sign in'}
                    </button>

                    <div className="flex items-center gap-3 py-3">
                        <div className="h-px bg-blue-200 flex-1" />
                        <span className="text-xs text-blue-600">OR</span>
                        <div className="h-px bg-blue-200 flex-1" />
                    </div>

                    <div className="flex justify-center">
                        <GoogleButton setLoginError={setLoginError} />
                    </div>

                    <div className="pt-4">
                        <p className="text-center font-light text-blue-700">Don't have an account?{' '}
                            <Link href="/register" className="text-blue-800 font-medium hover:text-blue-500 underline underline-offset-2 transition-colors">Register {arrow}</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

function GoogleButton({ setLoginError }: { setLoginError: (msg: string) => void }) {
 
    debugger;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
     debugger;
    const handleSuccess = async (credential?: string | null) => {
       debugger;
        try {
            if (!credential) {
                setLoginError('Google sign-in did not return a credential');
                return;
            }
            const res = await fetch('/api/auth/google-signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: credential })
            });
            const data = await res.json();
            if (res.ok && data?.isSuccess) {
                redirect('/dashboard');
           
            }
            setLoginError(data?.message ?? 'Google sign-in failed');
        } catch (e: any) {
            setLoginError(e?.message ?? 'Network error during Google sign-in');
        }
    };

    if (!clientId) {
        return (
            <button
                type="button"
                disabled
                className="w-full rounded-lg bg-gray-300 py-2 font-semibold text-gray-600 mt-2 cursor-not-allowed"
                title="Google Sign-In requires NEXT_PUBLIC_GOOGLE_CLIENT_ID"
            >
                Google Sign-In Unavailable
            </button>
        );
    }

    return (
        <GoogleLogin
            onSuccess={(response) => handleSuccess(response.credential)}
            onError={() => setLoginError('Google sign-in was cancelled or failed')}
            useOneTap
        />
    );
}
