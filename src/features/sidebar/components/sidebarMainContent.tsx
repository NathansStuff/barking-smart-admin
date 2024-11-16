'use client';

import { ReactElement } from 'react';

import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ADMIN_NAV_MAIN } from '@/data/sidebarInfo';

export function SidebarMainContent(): ReactElement {
  const pathname = usePathname();
  console.log(pathname, 'pathname');

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{ADMIN_NAV_MAIN.heading}</SidebarGroupLabel>
      <SidebarMenu>
        {ADMIN_NAV_MAIN.items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            className='group/collapsible'
            defaultOpen={item.items?.some((subItem) => pathname === subItem.url)}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
