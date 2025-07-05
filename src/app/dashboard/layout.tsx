// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import { getSideMenus } from 'services/menuservice';
import SideMenu from 'components/menu/SideMenu';
import Logout from 'components/ui/user/logout';

export default async function DashboardLayout({ children }: { children: ReactNode }) {

  const menu = await getSideMenus();
  return (


    <div className="flex">
 
      <SideMenu items={menu} />
      <main className="flex-1 p-6">{children}</main>
      <Logout />
    </div>

  );
}
