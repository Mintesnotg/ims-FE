// import { useForm } from "react-hook-form";
"use client";

import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../../../../lib/schemas/useraccount/loginschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginResponse } from "types/response/userresponse/loginresponse";
import { useState } from "react";
import Link from "next/link";
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
        debugger
        const {response} = await action(formData);
         
        if (!response?.isSuccess) {
              setLoginError(response?.message ?? 'Unknown error, please try again');

        }

    };


    return (


        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl bg-white p-8 shadow-lg max-w-md w-full">
                    <h2 className="mt-5 text-center text-xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>

                <label className="block">
                    <span className="text-sm font-medium">Username</span>
                    <input onKeyDown={()=> setLoginError('')}
                        {...register('email')}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600">{errors.email.message}</p>
                    )}
                </label>

                <label className="mt-4 block">
                    <span className="text-sm font-medium">Password</span>
                    <input onKeyDown={()=> setLoginError('')}
                        type="password"
                        {...register('password')}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                    {errors.password && (
                        <p className="text-xs text-red-600">{errors.password.message}</p>
                    )}
                </label>
                {errors.root && (
                    <p className="mt-4 text-center text-sm text-red-600">
                        {errors.root.message}
                    </p>
                )}

                {loginerror && (
                    <p className="mt-4 text-center text-sm text-red-600">
                        {loginerror}
                    </p>
                )}
                <div>
                    <p className="text-center font-light">You don't have account  ?         <Link href="/register" className="text-gray-800  font-medium hover:text-blue-500" > Register {arrow}  </Link></p>
          

                </div>
                <button
                    disabled={isSubmitting}
                    className="mt- w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
                </button>           
                 </form>
        </div>
    )
}