'use client';

import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import { AdminSidebarHeader } from './adminSidebarHeader';
import { SidebarMainContent } from './sidebarMainContent';
import { SidebarSecondaryContent } from './sidebarSecondaryContent';
import { SidebarUser } from './sidebarUser';

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>): React.ReactElement {
  return (
    <Sidebar
      collapsible='icon'
      {...props}
    >
      <SidebarHeader>
        <AdminSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainContent />
        <SidebarSecondaryContent />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
