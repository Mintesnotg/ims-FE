import { NextRequest, NextResponse } from 'next/server';
import { ROLE_ENDPOINT } from '../../../../../lib/apiendpoints';
import { httpGet } from '../../../../services/http';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
	try {
		const token = (await cookies()).get('accessToken')?.value;
		if (!token) {
			return NextResponse.json({ isSuccess: false, message: 'Unauthorized' }, { status: 401 });
		}
		const { searchParams } = new URL(req.url);
		const roleId = searchParams.get('roleId');
		if (!roleId) {
			return NextResponse.json({ isSuccess: false, message: 'roleId is required' }, { status: 400 });
		}
		const data = await httpGet(`${ROLE_ENDPOINT.RoleWithPrivilege}?roleId=${encodeURIComponent(roleId)}`, { token });
		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		const message = error?.message || 'Failed to fetch role details';
		return NextResponse.json({ isSuccess: false, message }, { status: 500 });
	}
} 