import { adminHeaderLinks, privateHeaderLinks, publicHeaderLinks } from '@/data/headerLinks';
import { HeaderLink } from '@/data/types/HeaderLink';

export function getHeaderLinks(isLoggedIn: boolean, isAdmin: boolean): HeaderLink[] {
  const links: HeaderLink[] = [];

  links.push(...publicHeaderLinks);
  if (isLoggedIn) links.push(...privateHeaderLinks);
  if (isAdmin) links.push(...adminHeaderLinks);
  return links;
}
