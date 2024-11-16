import { LucideIcon } from 'lucide-react';

// For nested navigation items
interface NavItem {
  title: string;
  url: string;
}

// For main navigation items
interface MainNavItem extends NavItem {
  icon: LucideIcon;
  items: NavItem[];
}

// For secondary navigation items
interface SecondaryNavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

// For user navigation items
interface UserNavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  separator?: boolean;
}

// Main navigation section
interface AdminNavMain {
  heading: string;
  items: MainNavItem[];
}

// Secondary navigation section
interface AdminNavSecondary {
  heading: string;
  items: SecondaryNavItem[];
}

export type { AdminNavMain, AdminNavSecondary, MainNavItem, NavItem, SecondaryNavItem, UserNavItem };