import { redirect } from 'next/navigation';
import { MenuItem } from "@/types/response/menuresponse/menuitem";
import { MENU_ENDPOINTS } from "../../lib/apiendpoints";
import getAuthToken from "./utilityservices/accesstokenservice";
import { httpGet } from './http';
import { AppError } from '../lib/errors';

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
    // Using shared http client
    const data = await httpGet<MenuApiResponse>(MENU_ENDPOINTS.Menus, {
        token,
        headers: {
            [ACCEPT_HEADER]: APPLICATION_JSON,
            [AUTHORIZATION_HEADER]: `Bearer ${token}`,
        },
    });
    return data;
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

        // Handle normalized AppError
        if ((error as AppError)?.code === 'UNAUTHORIZED') {
            redirect('/login');
        }

        // For authentication errors, redirect to login
        if (error instanceof Error && error.message.includes('Authentication token not found')) {
            redirect('/login');
        }

        throw error as Error;
    }
}