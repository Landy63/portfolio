import "./globals.css"
import { Inter } from "next/font/google"
import { ProjectProvider } from "@/contexts/ProjectContext"
import { ThemeProvider } from "next-themes"
import FloatingObjects from "@/components/FloatingObjects"
import ThemeChangeGif from "@/components/ThemeChangeGif"
import Script from "next/script"
import type { Metadata } from "next"
import Footer from "@/components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mon Portfolio",
  description: "Portfolio de développeur web",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F4F6" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
      style={{
        backgroundColor: "var(--background)",
        minHeight: "calc(100vh - env(safe-area-inset-bottom))", // Combined minHeight style
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
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            :root {
              --background: #F3F4F6;
            }
            html.dark {
              --background: #111827;
            }
            html.dark {
              color-scheme: dark;
              background-color: #1a202c;
              color: #e2e8f0;
            }
            html:not(.dark) {
              color-scheme: light;
              background-color: #4a5568;
              color: #e2e8f0;
            }
            body {
              min-height: 100vh;
              min-height: -webkit-fill-available;
            }
            #__next {
              min-height: 100vh;
              min-height: -webkit-fill-available;
            }
          `,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen transition-colors duration-300 bg-[--background] pt-safe-top pb-safe-bottom flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ProjectProvider>
            <FloatingObjects />
            <ThemeChangeGif />
            <div className="flex-grow">{children}</div>
            <Footer />
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

