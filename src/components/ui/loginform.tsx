// import { useForm } from "react-hook-form";
"use client";

import { useForm } from "react-hook-form";
import { LoginFormValues } from "../../../lib/schemas/useraccount/loginschema";

import { USER_ACCOUNT_ENDPOINTS } from "../../../lib/apiendpoints";
export default function Loginform({ action, }: {
    action: (fd: FormData) => Promise<{ error?: string }>;
}) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormValues>({});

    const onSubmit = async (values: LoginFormValues) => {
      
              debugger;


        const res = await action(Object.entries(values).reduce((fd, [k, v]) => {

            fd.append(k, v);
            return fd;

        }, new FormData()));
         console.log("response object result" + res )
        if (res?.error) setError('root', { message: res.error });
                debugger;

    };


    return (


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
               
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <label className="block">
                    <span className="text-sm font-medium">Username</span>
                    <input
                        {...register('email')}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600">{errors.email.message}</p>
                    )}
                </label>

                <label className="mt-4 block">
                    <span className="text-sm font-medium">Password</span>
                    <input
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
                <button
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? 'Signing in…' : 'Sign in'}
                </button>           
                 </form>
        </div>
    )
}