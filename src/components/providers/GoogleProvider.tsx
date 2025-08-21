"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

interface GoogleProviderProps {
	children: React.ReactNode;
}

export default function GoogleProvider({ children }: GoogleProviderProps) {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

	if (!clientId) {
		// Render children without provider if client id is missing to avoid runtime crash
		return <>{children}</>;
	}

	return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
} 