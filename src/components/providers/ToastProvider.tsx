"use client";

import { Toaster, toast } from 'react-hot-toast';
import React from 'react';

export default function ToastProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Toaster position="top-right" toastOptions={{ duration: 4000 }} />
			{children}
		</>
	);
}

export const notify = {
	success: (message: string) => toast.success(message),
	error: (message: string) => toast.error(message),
	info: (message: string) => toast(message),
}; 