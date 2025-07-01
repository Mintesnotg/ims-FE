"use client";

import React from 'react'
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterValues } from '../../../../lib/schemas/useraccount/registration';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterResponse } from 'types/response/userresponse/registerresponse';
import { Toaster, toast } from 'react-hot-toast';
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
     debugger;
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value as string));
        const  { response } = await action(formData);
        debugger;
        if (!response?.isSuccess) {
            debugger;
            
            // alert(`${response?.message}`)
            toast.error(`${response?.message}`);
            reset()
        }
    };
    return (

        <div className='mt-15 sm:mx-auto sm:w-full sm:max-w-lg'>
            <h2 className="mt-5 text-center text-xl/9 font-bold tracking-tight text-gray-900">Register</h2>
            <Toaster />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-2xl bg-white p-8 shadow-lg sm:max-w  w-full"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            {...register("firstName")}
                            placeholder="First Name"
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            {...register("lastName")}
                            placeholder="Last Name "
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="••••••••"
                            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>




        </div>
    )
}

export default Registration



