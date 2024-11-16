'use client';

import { ReactElement } from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ADMIN_NAV_SECONDARY } from '@/data/sidebarInfo';

export function SidebarSecondaryContent(): ReactElement {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>{ADMIN_NAV_SECONDARY.heading}</SidebarGroupLabel>
      <SidebarMenu>
        {ADMIN_NAV_SECONDARY.items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
