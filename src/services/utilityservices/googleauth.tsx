import { GoogleLogin } from "@react-oauth/google";

function GoogleButton({ setLoginError }: { setLoginError: (msg: string) => void }) {
 
  
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const handleSuccess = async (credential?: string | null) => {
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

                window.location.href = '/dashboard';
                return;
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

export default GoogleButton
