import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { MenuItem } from "types/response/menuresponse/menuitem";
import { MENU_ENDPOINTS } from "../../lib/apiendpoints";
import getAuthToken from "./utilityservices/accesstokenservice";

// Constants

const AUTHORIZATION_HEADER = "Authorization";
const ACCEPT_HEADER = "Accept";
const APPLICATION_JSON = "application/json";

/**
 * Raw menu node structure from API response
 */
interface RawMenuNode {
    id: string;
    name: string;
    icon: string | null;
    url: string | null;
    children?: { $values: RawMenuNode[] };
}

/**
 * API response structure
 */
interface MenuApiResponse {
    data?: {
        $values?: RawMenuNode[];
    };
}

/**
 * Maps a raw menu node from the API to our MenuItem interface
 * @param node - The raw menu node from API
 * @returns Transformed MenuItem
 */
function transformMenuNode(node: RawMenuNode): MenuItem {
    return {
        id: node.id,
        name: node.name,
        icon: node.icon,
        url: node.url,
        children: node.children?.$values?.map(transformMenuNode) ?? [],
    };
}


async function fetchMenuData(token: string): Promise<MenuApiResponse> {
    const response = await axios.get<MenuApiResponse>(MENU_ENDPOINTS.Menus, {
        headers: {
            [ACCEPT_HEADER]: APPLICATION_JSON,
            [AUTHORIZATION_HEADER]: `Bearer ${token}`,
        },
    });
    
    return response.data;
}

/**
 * Processes the API response to extract menu items
 * @param response - The API response
 * @returns Array of transformed menu items
 */
function processMenuResponse(response: MenuApiResponse): MenuItem[] {
    const rootNode = response.data?.$values?.[0];
    
    if (!rootNode?.children?.$values) {
        return [];
    }
    
    return rootNode.children.$values.map(transformMenuNode);
}

/**
 * Retrieves side menu items from the API
 * @returns Promise resolving to an array of menu items
 * @throws Error if authentication fails or API request fails
 */
export async function getSideMenus(): Promise<MenuItem[]> {
    try {
  
        const token = await getAuthToken();
        const response = await fetchMenuData(token);
        return processMenuResponse(response);
    } catch (error) {
        console.error('Failed to fetch menu data:', error);
        
        // Handle specific error types
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                redirect('/login');
            }
            throw new Error(`API request failed: ${error.message}`);
        }
        
        // For authentication errors, redirect to login
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            redirect('/login');
        }
        
        throw error;
    }
}