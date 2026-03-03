import Link from 'next/link';
import type { FooterData } from '@/lib/types';

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <img src={data.logo.url} alt={data.logo.alt || 'Sentiment AI'} width={140} height={32} />
            </Link>
            <p className="footer-tagline" dangerouslySetInnerHTML={{ __html: data.tagline }} />
          </div>
          {data.columns.map((col) => (
            <div key={col.title} className="footer-column">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.url}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>{data.copyright}</span>
          <div className="footer-links">
            {data.bottomLinks.map((link) => (
              <Link key={link.label} href={link.url}>{link.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
