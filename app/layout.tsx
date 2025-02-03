import './globals.css';
import { Inter } from 'next/font/google';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { ThemeProvider } from 'next-themes';
import FloatingObjects from '@/components/FloatingObjects';
import ThemeChangeGif from '@/components/ThemeChangeGif';
import Script from 'next/script';
import Footer from '@/components/Footer';
import FooterWrapper from "@/components/FooterWrapper";
import { metadata } from '../metadata'; // Importation du fichier metadata

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className="dark"
      style={{
        backgroundColor: 'var(--background)',
        minHeight: '100vh',
        minHeight: '-webkit-fill-available'
      }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Script 
          id="theme-script" 
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialColorMode() {
                  const persistedColorPreference = window.localStorage.getItem('theme');
                  const hasPersistedPreference = typeof persistedColorPreference === 'string';
                  if (hasPersistedPreference) {
                    return persistedColorPreference;
                  }
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
                  if (hasMediaQueryPreference) {
                    return mql.matches ? 'dark' : 'light';
                  }
                  return 'dark';
                }
                const colorMode = getInitialColorMode();
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add(colorMode);
                document.documentElement.style.colorScheme = colorMode;
              })()
            `
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen transition-colors duration-300 bg-[--background] pt-safe-top pb-safe-bottom flex flex-col`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <ProjectProvider>
            <FloatingObjects />
            <ThemeChangeGif />
            <div className="flex-grow">
              {children}
            </div>
            <FooterWrapper /> {/* Ajout du nouveau composant */}
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
