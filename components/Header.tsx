'use client';

import Link from 'next/link';
import type { HeaderData } from '@/lib/types';

interface HeaderProps {
  activeLink?: string;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  data: HeaderData;
}

export default function Header({ activeLink, onMenuToggle, isMenuOpen, data }: HeaderProps) {
  const productNav = data.navigation.find((item) => item.isParent);
  const navLinks = data.navigation.filter((item) => !item.isParent);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <img src={data.logo.url} alt={data.logo.alt || 'Sentiment AI'} width={140} height={32} />
        </Link>
        <nav className="nav">
          {productNav && (
            <div className="nav-dropdown">
              <Link
                href={productNav.link}
                className={`nav-link${activeLink === 'product' ? ' active' : ''}`}
              >
                {productNav.label}
                <svg className="nav-dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {productNav.children.map((child) => (
                  <Link key={child.link} href={child.link} className="nav-dropdown-item">
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {navLinks.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className={`nav-link${activeLink === item.link.replace(/^\/|\/$/g, '') ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href={data.bookACall.url} className="btn btn-outline-sm">{data.bookACall.title}</Link>
          <Link href={data.getInTouch.url} className="btn btn-white-sm">{data.getInTouch.title}</Link>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={onMenuToggle}
        >
          <span className="menu-toggle-bar"></span>
          <span className="menu-toggle-bar"></span>
          <span className="menu-toggle-bar"></span>
        </button>
      </div>
    </header>
  );
}
