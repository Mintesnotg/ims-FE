
'use server'

import { cookies } from "next/headers";
const AUTH_TOKEN_COOKIE_NAME = "accessToken";

export default async function getAuthToken(): Promise<string> {

    const token = (await cookies()).get(AUTH_TOKEN_COOKIE_NAME)?.value;
    
    if (!token) {
        throw new Error("Authentication token not found");
    }
    
    return token;
}
