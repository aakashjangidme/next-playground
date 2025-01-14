import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/auth-context';
import { SessionProvider } from '@/components/session-provider';

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
    </AuthProvider>
  );
};
