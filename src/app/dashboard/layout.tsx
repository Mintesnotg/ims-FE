// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import { getSideMenus } from 'services/menuservice';
import SideMenu from 'components/menu/SideMenu';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
debugger;
  const menu = await getSideMenus();

  return (

    <div className="flex">
      <SideMenu items={menu} />
      <main className="flex-1 flex justify-center p-6 ml-16 md:ml-64  transition-all duration-200">{children}</main>
 
    </div>

  );
}
