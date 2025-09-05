// app/dashboard/layout.tsx
import { ReactNode } from 'react';
import { getSideMenus } from '@/services/menuservice';
import SideMenu from '@/components/menu/SideMenu';
import Logout from '@/components/ui/user/logout';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  debugger;
  const menu = await getSideMenus();

  return (

    <div className="flex">
      <SideMenu items={menu} />
      <main className="flex-1 flex flex-col p-6 ml-16 md:ml-64 transition-all duration-200">
        <div className="w-full flex justify-end mb-4">
          <Logout open={true} />
        </div>
        <div className="flex-1 flex justify-center">
          {children}
        </div>
      </main>
 
    </div>

  );
}
