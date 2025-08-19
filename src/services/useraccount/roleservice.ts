
import axios, { AxiosError } from 'axios';
import { ROLE_ENDPOINT, PRIVILEGE_ENDPOINTS } from '../../../lib/apiendpoints';
import { GetAllRolesResponse } from '../../types/response/roleresponse/roleresponse';
import getAuthToken from 'services/utilityservices/accesstokenservice';
import { UpdateRoleResponse } from '../../types/response/roleresponse/updateroleresponse';
import { AllPrivilegesResponse } from '../../types/response/roleresponse/privilegeresponse';

// Constants
const AUTHORIZATION_HEADER = "Authorization";
const ACCEPT_HEADER = "Accept";
const APPLICATION_JSON = "application/json";

export async function GetAllRoles(): Promise<GetAllRolesResponse> {
    try {
        const token =  await getAuthToken();
        console.log(token)
        const response = await axios.get<GetAllRolesResponse>(ROLE_ENDPOINT.Roles, {
            headers: {
                [ACCEPT_HEADER]: APPLICATION_JSON,
                [AUTHORIZATION_HEADER]: `Bearer ${token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        
        // Handle specific error types
        if (error instanceof AxiosError) {
            const status = error.response?.status;
            if (status === 401) {
                // Redirect to login for unauthorized access
                window.location.href = '/login';
                throw new Error('Unauthorized access');
            }
            throw new Error(`API request failed${status ? ` with status ${status}` : ''}: ${error.message}`);
        }
        
        // For authentication errors, redirect to login
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        
        throw error as Error;
    }
}

// Fetch a single role with its privileges
export async function GetRoleWithPrivilege(roleId: string): Promise<UpdateRoleResponse> {
    debugger;
    try {
        const token = await getAuthToken();
        const response = await axios.get<UpdateRoleResponse>(ROLE_ENDPOINT.RoleWithPrivilege, {
            
            headers: {
                [ACCEPT_HEADER]: APPLICATION_JSON,
                [AUTHORIZATION_HEADER]: `Bearer ${token}`,
            },
            params: { roleId },
        });
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching role with privileges:', error);
        if (error instanceof AxiosError) {
            const status = error.response?.status;
            if (status === 401) {
                window.location.href = '/login';
                throw new Error('Unauthorized access');
            }
            throw new Error(`API request failed${status ? ` with status ${status}` : ''}: ${error.message}`);
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
        const response = await axios.get<AllPrivilegesResponse>(PRIVILEGE_ENDPOINTS.All, {
            headers: {
                [ACCEPT_HEADER]: APPLICATION_JSON,
                [AUTHORIZATION_HEADER]: `Bearer ${token}`,
            },
        });
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching all privileges:', error);
        if (error instanceof AxiosError) {
            const status = error.response?.status;
            if (status === 401) {
                window.location.href = '/login';
                throw new Error('Unauthorized access');
            }
            throw new Error(`API request failed${status ? ` with status ${status}` : ''}: ${error.message}`);
        }
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        throw error as Error;
    }
}
