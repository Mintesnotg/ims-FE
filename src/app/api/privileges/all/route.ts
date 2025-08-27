import { NextRequest, NextResponse } from 'next/server';
import { PRIVILEGE_ENDPOINTS } from '../../../../../lib/apiendpoints';
import { httpGet } from '../../../../services/http';
import { cookies } from 'next/headers';

export async function GET(_req: NextRequest) {
	try {
		const token = (await cookies()).get('accessToken')?.value;
		if (!token) {
			return NextResponse.json({ isSuccess: false, message: 'Unauthorized' }, { status: 401 });
		}
		const result: any = await httpGet(PRIVILEGE_ENDPOINTS.All, { token });

		// Normalize to { data: { $values: [] } }
		let normalized = result;
		if (result && typeof result === 'object') {
			const raw = (result as any).data;
			if (Array.isArray(raw)) {
				normalized = { ...result, data: { $values: raw } };
			} else if (raw && Array.isArray(raw.$values)) {
				normalized = result;
			} else if (raw && Array.isArray((raw as any).values)) {
				normalized = { ...result, data: { $values: (raw as any).values } };
			}
		}

		return NextResponse.json(normalized, { status: 200 });
	} catch (error: any) {
		const message = error?.message || 'Failed to fetch privileges';
		return NextResponse.json({ isSuccess: false, message }, { status: 500 });
	}
} 