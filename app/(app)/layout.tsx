import { Suspense } from 'react';
import { LinearLoaderIndicator } from '@/lib/with-loadable';
import { SiteFooter } from '@/components/layout/footer/site-footer';
import { SiteHeader } from '@/components/layout/header/site-header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="border-grid flex flex-col min-h-svh">
      <SiteHeader />

      <Suspense fallback={<LinearLoaderIndicator />}>
        <main className="flex flex-1 flex-col">{children}</main>
      </Suspense>

      <SiteFooter />
    </div>
  );
}
