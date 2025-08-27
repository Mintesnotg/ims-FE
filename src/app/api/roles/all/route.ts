import { NextRequest, NextResponse } from 'next/server';
import { ROLE_ENDPOINT } from '../../../../../lib/apiendpoints';
import { httpGet } from '../../../../services/http';
import { cookies } from 'next/headers';

export async function GET(_req: NextRequest) {
	try {
		const token = (await cookies()).get('accessToken')?.value;
		if (!token) {
			return NextResponse.json({ isSuccess: false, message: 'Unauthorized' }, { status: 401 });
		}
		const data = await httpGet(ROLE_ENDPOINT.Roles, { token });
		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		const message = error?.message || 'Failed to fetch roles';
		return NextResponse.json({ isSuccess: false, message }, { status: 500 });
	}
} 