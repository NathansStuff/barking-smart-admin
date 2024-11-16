import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
} from 'lucide-react';

import { AdminNavMain, AdminNavSecondary, UserNavItem } from './types/AdminSidebarTypes';

export const APP_NAME = 'Barking Smart';
export const ADMIN_SUBTITLE = 'Administrative Dashboard';
export const ADMIN_LOGO = GalleryVerticalEnd;

export const ADMIN_NAV_MAIN: AdminNavMain = {
  heading: 'Platform',
  items: [
    {
      title: 'Playground',
      url: '/admin/dog',
      icon: SquareTerminal,
      items: [
        {
          title: 'Dog',
          url: '/admin/dog',
        },
        {
          title: 'Programs',
          url: '/admin/program',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
};

export const ADMIN_NAV_SECONDARY: AdminNavSecondary = {
  heading: 'Projects',
  items: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export const ADMIN_USER_NAVIGATION: UserNavItem[][] = [
  [
    {
      name: 'Upgrade to Pro',
      url: '#',
      icon: Sparkles,
      separator: true,
    },
  ],
  [
    {
      name: 'Account',
      url: '#',
      icon: BadgeCheck,
    },
    {
      name: 'Billing',
      url: '#',
      icon: CreditCard,
    },
    {
      name: 'Notifications',
      url: '#',
      icon: Bell,
    },
  ],
];
