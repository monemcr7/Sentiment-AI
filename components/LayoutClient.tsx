'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import MobileSidebar from './MobileSidebar';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import type { HeaderData } from '@/lib/types';

interface LayoutClientProps {
  children: React.ReactNode;
  headerData: HeaderData;
}

export default function LayoutClient({ children, headerData }: LayoutClientProps) {
  const { isOpen, toggle, close } = useMobileMenu();
  const pathname = usePathname();
  const activeLink = pathname === '/' ? 'home' : pathname.slice(1);

  return (
    <>
      <Header activeLink={activeLink} onMenuToggle={toggle} isMenuOpen={isOpen} data={headerData} />
      <MobileSidebar activeLink={activeLink} isOpen={isOpen} onClose={close} data={headerData} />
      {children}
    </>
  );
}
