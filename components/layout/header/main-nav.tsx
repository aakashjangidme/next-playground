import { navConfig } from '@/config/nav';
import { siteConfig } from '@/config/site';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ActiveLink from '@/components/active-link';
import { Icons } from '@/components/icons';

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {navConfig.mainNav?.map(
          (item) =>
            item.href && (
              <ActiveLink
                key={item.href}
                href={item.href}
                activeClassName="text-foreground font-semibold"
                className={cn(
                  'transition-colors hover:text-foreground/80 text-foreground/80'
                )}
              >
                {item.title}
              </ActiveLink>
            )
        )}
      </nav>
    </div>
  );
}
