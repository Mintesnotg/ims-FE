import axios, { AxiosError } from 'axios';
import { ROLE_ENDPOINT } from '../../../lib/apiendpoints';
import { GetAllRolesResponse } from '../../types/response/roleresponse/roleresponse';
import getAuthToken from 'services/utilityservices/accesstokenservice';

// Constants
const AUTH_TOKEN_COOKIE_NAME = "accessToken";
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
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        
        // Handle specific error types
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                // Redirect to login for unauthorized access
                window.location.href = '/login';
                throw new Error('Unauthorized access');
            }
            throw new Error(`API request failed: ${error.message}`);
        }
        
        // For authentication errors, redirect to login
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            window.location.href = '/login';
            throw new Error('Authentication token not found');
        }
        
        throw error;
    }
}