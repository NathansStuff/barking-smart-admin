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
import { PROJECT_NAME } from '@/constants';
import { AdminSidebar } from '@/features/sidebar/components/adminSidebar';

export const metadata: Metadata = {
  title: `${PROJECT_NAME} - Admin`,
  description: `${PROJECT_NAME} Administrative dashboard`,
};

export default function AdminLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className='flex flex-1'>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 h-4'
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='/'>Barkin Smart</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Admin</BreadcrumbPage>
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
