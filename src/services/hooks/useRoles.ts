"use client";

import useSWR from 'swr';
import { GetAllRolesResponse } from '../../types/response/roleresponse/roleresponse';
import { UpdateRoleResponse } from '../../types/response/roleresponse/updateroleresponse';
import { AllPrivilegesResponse } from '../../types/response/roleresponse/privilegeresponse';

async function swrFetcher<T>(url: string): Promise<T> {
	const res = await fetch(url, { credentials: 'include' });
	if (!res.ok) {
		throw new Error(`Failed to fetch: ${res.status}`);
	}
	return res.json() as Promise<T>;
}

export function useRoles() {
	const { data, error, isLoading, mutate } = useSWR<GetAllRolesResponse>('/api/roles/all', swrFetcher);
	return { data, error, isLoading, mutate };
}

export function useRoleWithPrivileges(roleId?: string) {
	const key = roleId ? [`/api/roles/with-privileges?roleId=${encodeURIComponent(roleId)}`] as const : null;
	const { data, error, isLoading, mutate } = useSWR<UpdateRoleResponse>(
		key,
		([url]: readonly [string]) => swrFetcher<UpdateRoleResponse>(url)
	);
	return { data, error, isLoading, mutate };
}

export function useAllPrivileges() {
	const { data, error, isLoading, mutate } = useSWR<AllPrivilegesResponse>('/api/privileges/all', swrFetcher);
	return { data, error, isLoading, mutate };
} 