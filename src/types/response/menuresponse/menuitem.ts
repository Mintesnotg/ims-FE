export interface MenuItem {
  id: string;
  name: string;
  icon?: string | null;
  url?: string | null;
  children: MenuItem[];
}
