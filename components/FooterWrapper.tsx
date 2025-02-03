"use client";

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return !isAdminPage ? <Footer /> : null;
}
