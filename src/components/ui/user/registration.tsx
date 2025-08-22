"use client";

import React from 'react'
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterValues } from '../../../../lib/schemas/useraccount/registration';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterResponse } from 'types/response/userresponse/registerresponse';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import { redirect } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

type RegisterFormProps = {
    action: (fd: FormData) => Promise<{ response?: RegisterResponse | undefined }>;
};
const Registration = ({action}:RegisterFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
     });

    const onSubmit = async (values: RegisterValues) => {
  
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value as string));
        const  { response } = await action(formData);
        debugger;
        if (!response?.isSuccess) {
            debugger;
            
            // alert(`${response?.message}`)
            toast.error(`${response?.message}`);
            reset()
        } else {     
            redirect('/login');
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-8 px-4">
            <div className="w-full max-w-lg mx-auto">
                <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm">Register</h2>
                <Toaster />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 rounded-3xl bg-white/90 p-10 shadow-2xl border border-blue-100 backdrop-blur-md"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-blue-700">First Name</label>
                            <input
                                type="text"
                                {...register("firstName")}
                                placeholder="First Name"
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                            />
                            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-blue-700">Last Name</label>
                            <input
                                type="text"
                                {...register("lastName")}
                                placeholder="Last Name"
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                            />
                            {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-blue-700">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="john@example.com"
                            className="w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-blue-700">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-blue-700">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword")}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm bg-blue-50 placeholder:text-blue-300"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="pt-2">
                        <p className="text-center font-light text-blue-700">Back to{' '}
                            <Link href="/login" className="text-blue-800 font-medium hover:text-blue-500 underline underline-offset-2 transition-colors">Login</Link>
                        </p>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white shadow-md hover:bg-blue-700 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registration



