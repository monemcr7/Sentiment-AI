'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { HeaderData } from '@/lib/types';

interface MobileSidebarProps {
  activeLink?: string;
  isOpen: boolean;
  onClose: () => void;
  data: HeaderData;
}

export default function MobileSidebar({ activeLink, isOpen, onClose, data }: MobileSidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const productNav = data.navigation.find((item) => item.isParent);
  const navLinks = data.navigation.filter((item) => !item.isParent);

  return (
    <>
      <div
        className="sidebar-backdrop"
        aria-hidden={!isOpen}
        onClick={onClose}
      />
      <aside className="sidebar" aria-label="Mobile navigation" aria-hidden={!isOpen}>
        <button type="button" className="sidebar-close" aria-label="Close menu" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <nav className="sidebar-nav">
          {productNav && (
            <div className="sidebar-dropdown">
              <div className="sidebar-dropdown-toggle">
                <Link
                  href={productNav.link}
                  className={`sidebar-link${activeLink === 'product' ? ' active' : ''}`}
                  onClick={onClose}
                >
                  {productNav.label}
                </Link>
                <button
                  type="button"
                  className="sidebar-dropdown-btn"
                  aria-expanded={dropdownOpen}
                  aria-label={`Expand ${productNav.label} submenu`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="sidebar-dropdown-menu" aria-hidden={!dropdownOpen}>
                {productNav.children.map((child) => (
                  <Link key={child.link} href={child.link} className="sidebar-sublink" onClick={onClose}>
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
              className={`sidebar-link${activeLink === item.link.replace(/^\/|\/$/g, '') ? ' active' : ''}`}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-actions">
          <Link href={data.bookACall.url} className="btn btn-outline-sm" onClick={onClose}>{data.bookACall.title}</Link>
          <Link href={data.getInTouch.url} className="btn btn-white-sm" onClick={onClose}>{data.getInTouch.title}</Link>
        </div>
      </aside>
    </>
  );
}
