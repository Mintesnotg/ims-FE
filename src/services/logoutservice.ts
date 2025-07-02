// app/(auth)/logout-action.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
    // Remove the cookie (or set it expired)
    const cookieStore = cookies();
    (await cookieStore).delete('accessToken');

    // Or, if you prefer to expire it explicitly:
    // cookieStore.set('accessToken', '', { maxAge: 0, path: '/' });

    // Kick the user back to the login page (or landing page)
    redirect('/login');
}