import { privateHeaderLinks, publicHeaderLinks } from '@/data/headerLinks';
import { HeaderLink } from '@/data/types/HeaderLink';

export function getHeaderLinks(isLoggedIn: boolean): HeaderLink[] {
  const links: HeaderLink[] = [];

  links.push(...publicHeaderLinks);
  if (isLoggedIn) links.push(...privateHeaderLinks);

  return links;
}
