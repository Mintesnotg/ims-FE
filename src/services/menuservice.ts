// 'use server';
import { cookies } from "next/headers";
import { MenuItem } from "types/response/menuresponse/menuitem";
import { MENU_ENDPOINTS } from "../../lib/apiendpoints";
import { redirect } from 'next/navigation';
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

    const res = await fetch(`${MENU_ENDPOINTS.Menus}`, {
        cache: "no-cache",            // always fresh for the user who just logged in
        next: { revalidate: 0 },      // disable Next.js route‑segment caching
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!res.ok) {
        redirect('/login');
    }
    debugger;
    const json = await res.json();                         // <‑‑ full payload you pasted
    const root = json.data?.$values?.[0];                  // "ROOT" node
    return root?.children?.$values?.map(mapNode) ?? [];
}