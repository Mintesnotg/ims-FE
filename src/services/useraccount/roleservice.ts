
import { ROLE_ENDPOINT, PRIVILEGE_ENDPOINTS } from '../../../lib/apiendpoints';
import { GetAllRolesResponse } from '../../types/response/roleresponse/roleresponse';
import getAuthToken from 'services/utilityservices/accesstokenservice';
import { UpdateRoleResponse } from '../../types/response/roleresponse/updateroleresponse';
import { AllPrivilegesResponse } from '../../types/response/roleresponse/privilegeresponse';
import { httpGet, httpPut, httpDelete } from '../http';

// Constants
const UNAUTHORIZED_TEXT = 'HTTP 401';

export async function GetAllRoles(): Promise<GetAllRolesResponse> {
    try {
        const token =  await getAuthToken();
        const data = await httpGet<GetAllRolesResponse>(ROLE_ENDPOINT.Roles, { token });
        return data;
    } catch (error) {
        console.error('Error fetching roles:', error);

        if (error instanceof Error && error.message.includes(UNAUTHORIZED_TEXT)) {
            window.location.href = '/login';
            throw new Error('Unauthorized access');
        }
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        throw error as Error;
    }
}

// Fetch a single role with its privileges
export async function GetRoleWithPrivilege(roleId: string): Promise<UpdateRoleResponse> {
    try {
        const token = await getAuthToken();
        const data = await httpGet<UpdateRoleResponse>(ROLE_ENDPOINT.RoleWithPrivilege, {
            token,
            params: { roleId },
        });
        return data;
    } catch (error) {
        console.error('Error fetching role with privileges:', error);
        if (error instanceof Error && error.message.includes(UNAUTHORIZED_TEXT)) {
            window.location.href = '/login';
            throw new Error('Unauthorized access');
        }
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        throw error as Error;
    }
}

// Fetch all privileges
export async function GetAllPrivileges(): Promise<AllPrivilegesResponse> {
    try {
        const token = await getAuthToken();
        const data = await httpGet<AllPrivilegesResponse>(PRIVILEGE_ENDPOINTS.All, { token });
        return data;
    } catch (error) {
        console.error('Error fetching all privileges:', error);
        if (error instanceof Error && error.message.includes(UNAUTHORIZED_TEXT)) {
            window.location.href = '/login';
            throw new Error('Unauthorized access');
        }
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        throw error as Error;
    }
}

// Update role with privileges
export async function UpdateRole(roleId: string, privilegeIds: string[], roleName?: string, description?: string): Promise<UpdateRoleResponse> {
    try {
        const token = await getAuthToken();
        const data = await httpPut<UpdateRoleResponse>(
            ROLE_ENDPOINT.UpdateRole,
            { roleId, privilegeIds, name: roleName, description },
            { token }
        );
        return data;
    } catch (error) {
        console.error('Error updating role:', error);
        if (error instanceof Error && error.message.includes(UNAUTHORIZED_TEXT)) {
            window.location.href = '/login';
            throw new Error('Unauthorized access');
        }
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        throw error as Error;
    }
}

// Delete role by id
export async function DeleteRole(roleId: string): Promise<GetAllRolesResponse> {
    try {
        console.log(` the role id is ${roleId}`)
 
        const token = await getAuthToken();
        const data = await httpDelete<GetAllRolesResponse>(ROLE_ENDPOINT.DeleteRole, {
            token,
             params : {roleId}
        });
        return data;
    } catch (error) {
        console.error('Error deleting role:', error);
        if (error instanceof Error && error.message.includes(UNAUTHORIZED_TEXT)) {
            window.location.href = '/login';
            throw new Error('Unauthorized access');
        }
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        throw error as Error;
    }
}
