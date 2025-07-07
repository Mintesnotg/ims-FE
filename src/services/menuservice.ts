// 'use server';
import { cookies } from "next/headers";
import { MenuItem } from "types/response/menuresponse/menuitem";
import { MENU_ENDPOINTS } from "../../lib/apiendpoints";
import { redirect } from 'next/navigation';
import axios from 'axios';
// MENU_ENDPOINTS


type RawMenuNode = {
    id: string;
    name: string;
    icon: string | null;
    url: string | null;
    children?: { $values: RawMenuNode[] };
};

function mapNode(node: RawMenuNode): MenuItem {
    return {
        id: node.id,
        name: node.name,
        icon: node.icon,
        url: node.url,
        children: node.children?.$values?.map(mapNode) ?? [],
    };
}

export async function getSideMenus(): Promise<MenuItem[]> {
    debugger;

    const token = (await cookies()).get("accessToken")?.value;
    if (!token) throw new Error("No auth token found");

    try {
      const { data: json } = await axios.get(`${MENU_ENDPOINTS.Menus}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
      const root = json.data?.$values?.[0];
      return root?.children?.$values?.map(mapNode) ?? [];
    } catch (err: any) {
      redirect('/login');
    }
}