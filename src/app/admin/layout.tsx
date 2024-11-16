import { ReactNode } from 'react';

import { Separator } from '@radix-ui/react-separator';
import { Metadata } from 'next';

import BackgroundContainer from '@/components/container/BackgroundContainer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/features/sidebar/components/adminSidebar';

export const metadata: Metadata = {
  title: 'Dashboard - Barking Smart Admin',
  description: 'Barking Smart Administrative dashboard',
};

export default function AdminLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className='flex flex-1 overflow-hidden'>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 h-4'
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <BackgroundContainer>{children}</BackgroundContainer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}