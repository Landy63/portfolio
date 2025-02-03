'use client'

import Header from '@/components/Header'
import WelcomeSection from '@/components/WelcomeSection'
import ProjectSection from '@/components/ProjectSection'
import AboutMe from '@/components/AboutMe'
import ContactForm from '@/components/ContactForm'
import { useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function Home() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const scrollTo = sessionStorage.getItem('scrollTo');
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        setTimeout(() => {
          const navbarHeight = isMobile ? 56 : 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          sessionStorage.removeItem('scrollTo');
        }, 100);
      }
    }
  }, [isMobile]);

  const sectionClassName = `flex-1 ${isMobile ? 'mt-4' : 'mt-2 md:pt-24'}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className={`container mx-auto px-4 ${isMobile ? 'pt-4 pb-20' : 'pt-20 pb-12'} flex flex-col`}>
        <WelcomeSection className={`flex-1 ${isMobile ? '' : 'md:pt-24'}`} />
        <ProjectSection className={sectionClassName} />
        <AboutMe className={sectionClassName} />
        <ContactForm className={sectionClassName} />
      </main>
    </div>
  )
}

