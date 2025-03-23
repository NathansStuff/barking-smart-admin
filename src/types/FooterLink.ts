import { Route } from 'next';

import { FooterCategory } from './FooterCategory';

export interface FooterLink {
  title: string;
  href: Route;
  category: FooterCategory;
}
