import {
  BadgeCheck,
  Bell,
  ChartBar,
  CloudCog,
  CloudLightning,
  CreditCard,
  Database,
  Figma,
  FileText,
  GalleryVerticalEnd,
  Layout,
  ListTodo,
  Mail,
  Settings2,
  Sparkles,
} from 'lucide-react';

import { AdminNavMain, AdminNavSecondary, UserNavItem } from './types/AdminSidebarTypes';

export const APP_NAME = 'Barking Smart';
export const ADMIN_SUBTITLE = 'Administrative Dashboard';
export const ADMIN_LOGO = GalleryVerticalEnd;

export const ADMIN_NAV_MAIN: AdminNavMain = {
  heading: 'Platform Tools',
  items: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: ChartBar,
    },
    {
      title: 'Todo',
      url: '/admin/dashboard',
      icon: ListTodo,
    },
    {
      title: 'Features',
      icon: Database,
      items: [
        {
          title: 'Programs',
          url: '/admin/program',
        },
        {
          title: 'Dogs',
          url: '/admin/dog',
        },
        {
          title: 'Final Product',
          url: '#',
        },
      ],
    },
    {
      title: 'EDMs',
      icon: Mail,
      items: [
        {
          title: 'Emails',
          url: '/admin/email',
        },
        {
          title: 'SMS',
          url: '/admin/sms',
        },
      ],
    },
    {
      title: 'User Management',
      icon: Settings2,
      items: [
        {
          title: 'Users',
          url: '/admin/users',
        },
        {
          title: 'Activity Logs',
          url: '/admin/activity',
        },
      ],
    },
  ],
};

export const ADMIN_NAV_SECONDARY: AdminNavSecondary = {
  heading: 'Links',
  items: [
    {
      name: 'Figma',
      url: 'https://www.figma.com/design/rF3N8usbAZEvUczdc0CzKx/www.puntstat.com?node-id=248-4488&node-type=canvas&t=n4AM2T1JJ7Q2hJ40-0',
      icon: Figma,
    },
    {
      name: 'Email',
      url: 'https://www.zoho.com/mail/zohomail-pricing.html',
      icon: Mail,
    },
    {
      name: 'Accounting Receipts',
      url: 'https://drive.google.com/drive/folders/1Li0srqnqUpoDhZDmY6lqhfdFXBVJKZJQ',
      icon: FileText,
    },
    {
      name: 'Wireframes',
      url: 'https://balsamiq.cloud/sarjd8t/p9dgjmg/rC0E6',
      icon: Layout,
    },
    {
      name: 'Google Cloud Console',
      url: 'https://console.cloud.google.com/apis/credentials/oauthclient/997080468068-ps6i94c4pki940saoh8sffr9v7is5975.apps.googleusercontent.com?project=barking-smart',
      icon: CloudCog,
    },
    {
      name: 'AWS',
      url: 'https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1#',
      icon: CloudLightning,
    },
    {
      name: 'MongoDB',
      url: 'https://cloud.mongodb.com/v2/6725d2e3077cc50840dbc913#/overview',
      icon: Database,
    },
    {
      name: 'Stripe',
      url: 'https://dashboard.stripe.com/test/dashboard',
      icon: CreditCard,
    },
    {
      name: 'Google Analytics',
      url: 'https://analytics.google.com/analytics/web/#/p415254259/reports/reportinghub',
      icon: ChartBar,
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
