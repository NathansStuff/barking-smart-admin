import { HeaderLink } from './types/HeaderLink';

export const publicHeaderLinks: HeaderLink[] = [];

export const privateHeaderLinks: HeaderLink[] = [];

export const verifiedHeaderLinks: HeaderLink[] = [
  {
    title: 'Programs',
    href: '/program',
  },
];

export const adminHeaderLinks: HeaderLink[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },{
    title: 'Requirements',
    href: '/required-programs',
  },
  {
    title: 'Admin',
    href: '/admin',
  },
];
