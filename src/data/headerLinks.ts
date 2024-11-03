import { HeaderLink } from './types/HeaderLink';

export const publicHeaderLinks: HeaderLink[] = [
  {
    title: 'Programs',
    href: '/program',
  },
];

export const privateHeaderLinks: HeaderLink[] = [];

export const verifiedHeaderLinks: HeaderLink[] = [];

export const adminHeaderLinks: HeaderLink[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Requirements',
    href: '/required-programs',
  },
  {
    title: 'Admin',
    href: '/admin',
  },
];
