import { store } from '@/contexts/store';
import {
  adminHeaderLinks,
  privateHeaderLinks,
  publicHeaderLinks,
  verifiedHeaderLinks,
} from '@/data/headerLinks';
import { HeaderLink } from '@/data/types/HeaderLink';
import { EUserRole } from '@/features/user/types/EUserRole';

export function getHeaderLinks(isLoggedIn: boolean): HeaderLink[] {
  const links: HeaderLink[] = [];
  const { role } = store.getState().user;

  links.push(...publicHeaderLinks);
  if (isLoggedIn) links.push(...privateHeaderLinks);
  if (role === EUserRole.USER || role === EUserRole.ADMIN)
    links.push(...verifiedHeaderLinks);
  if (role === EUserRole.ADMIN) links.push(...adminHeaderLinks);

  return links;
}
