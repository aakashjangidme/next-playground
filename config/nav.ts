import { MainNavItem, SidebarNavItem } from '@/types/nav';

export interface NavConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  chartsNav?: SidebarNavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ],
  sidebarNav: [],
};
