import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { USER_ACCOUNT_ENDPOINTS } from "../../../../../lib/apiendpoints";
import { LoginResponse } from "types/response/userresponse/loginresponse";

export async function POST(req: NextRequest) {
   debugger;
    try {
		const { idToken } = await req.json();
		if (!idToken || typeof idToken !== "string") {
			return NextResponse.json(
				{ isSuccess: false, message: "Missing idToken" },
				{ status: 400 }
			);
		}

		const { data } = await axios.post<LoginResponse>(
			USER_ACCOUNT_ENDPOINTS.GoogleSignIn,
			{ idToken },
			{ headers: { "Content-Type": "application/json" } }
		);

		if (data?.isSuccess && data?.data?.accessToken) {
			 debugger;
            
            const res = NextResponse.json(data, { status: 200 });
			res.cookies.set("accessToken", data.data.accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				path: "/",
			});
			return res;
		}

		return NextResponse.json(data ?? { isSuccess: false, message: "Login failed" }, { status: 401 });
	} catch (error: any) {
		const message =
			error?.response?.data?.message || error?.message || "Unexpected error";
		return NextResponse.json(
			{ isSuccess: false, message },
			{ status: 500 }
		);
	}
} 