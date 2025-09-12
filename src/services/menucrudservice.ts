import { httpGet, httpPost, httpPut, httpDelete, HttpOptions } from './http';
import { MENU_ENDPOINTS } from '../../lib/apiendpoints';
import { MenuResponse, MenuApiResponse, MenuRequest, Pagination, ParentMenuApiResponse } from '@/types/response/menuresponse/menuresponse';
import getAuthToken from './utilityservices/accesstokenservice';

export interface MenuListParams {
  page?: number;
  pageSize?: number;
}

/**
 * Fetches all menus with pagination
 */
export async function getAllMenus(params: MenuListParams = {}): Promise<Pagination<MenuResponse>> {
  try {
    debugger;
    console.log(params);
    const token = await getAuthToken();
    const { page = params.page,pageSize = params.pageSize } = params;
    
    const options: HttpOptions = {
      token,
      params: { page, pageSize }
    };

    const response = await httpGet<MenuApiResponse>(MENU_ENDPOINTS.GetAllMenus, options);
    
    if (!response.isSuccess || !response.data) {
      throw new Error(response.message || 'Failed to fetch menus');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch menus:', error);
    throw error;
  }
}

/**
 * Creates a new menu
 */
export async function createMenu(menuData: MenuRequest): Promise<MenuResponse> {
 
   debugger;
  try {
    const token = await getAuthToken();
    
    const options: HttpOptions = {
      token
    };

    const response = await httpPost<MenuApiResponse>(MENU_ENDPOINTS.CreateMenu, menuData, options);
    
    if (!response.isSuccess || !response.data) {
      throw new Error(response.message || 'Failed to create menu');
    }

    // For create/update/delete, the response.data should be a single MenuResponse
    return response.data as any;
  } catch (error) {
    console.error('Failed to create menu:', error);
    throw error;
  }
}

/**
 * Updates an existing menu
 */
export async function updateMenu(id: string, menuData: MenuRequest): Promise<MenuResponse> {
  try {
    debugger;
    const token = await getAuthToken();
    
    const options: HttpOptions = {
      token
    };

    const response = await httpPut<MenuApiResponse>(MENU_ENDPOINTS.UpdateMenu, { id, ...menuData }, options);
    
    if (!response.isSuccess || !response.data) {
      throw new Error(response.message || 'Failed to update menu');
    }

    // For create/update/delete, the response.data should be a single MenuResponse
    return response.data as any;
  } catch (error) {
    console.error('Failed to update menu:', error);
    throw error;
  }
}

/**
 * Deletes a menu
 */
export async function deleteMenu(id: string): Promise<void> {
  try {
    const token = await getAuthToken();
    
    const options: HttpOptions = {
      token,
      params: { id }
    };

    const response = await httpDelete<MenuApiResponse>(MENU_ENDPOINTS.DeleteMenu, options);
    
    if (!response.isSuccess) {
      throw new Error(response.message || 'Failed to delete menu');
    }
  } catch (error) {
    console.error('Failed to delete menu:', error);
    throw error;
  }
}

/**
 * Fetches all parent menus for dropdown selection
 */
export async function getAllParentMenus(): Promise<MenuResponse[]> {
  try {
    const token = await getAuthToken();
    
    const options: HttpOptions = {
      token
    };

    const response = await httpGet<ParentMenuApiResponse>(MENU_ENDPOINTS.GetAllParentMenus, options);
    debugger;
    if (!response.isSuccess || !response.data) {
      throw new Error(response.message || 'Failed to fetch parent menus');
    }

    return response.data.$values || [];
  } catch (error) {
    console.error('Failed to fetch parent menus:', error);
    throw error;
  }
}
