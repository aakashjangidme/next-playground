import { getSession } from '@/services/session';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { logoutAction } from '@/app/actions/auth';

export async function SiteHeader() {
  const session = await getSession();

  const user = session.user?.uid;

  return <Header user={user} />;
}

type HeaderProps = {
  user: any;
};

const Header = ({ user }: HeaderProps) => {
  const handleLoginRedirect = async () => {
    'use server';
    redirect('/login');
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <MobileNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none"></div>
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                <Link href={'#'} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <ModeToggle />
              {!user ? (
                <Button onClick={handleLoginRedirect}>Login</Button>
              ) : (
                <Button onClick={logoutAction}>Logout</Button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
