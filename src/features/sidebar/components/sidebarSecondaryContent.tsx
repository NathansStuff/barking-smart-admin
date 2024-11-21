'use client';

import { ReactElement } from 'react';

import { Route } from 'next';
import Link from 'next/link';

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
              <Link
                href={item.url as Route}
                target='_blank'
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
