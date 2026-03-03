import Link from 'next/link';

interface CTASectionProps {
  title: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export default function CTASection({
  title,
  buttonText = 'Book a Demo',
  buttonHref = '/contact',
  className = '',
}: CTASectionProps) {
  return (
    <section className={`cta${className ? ` ${className}` : ''}`}>
      <h2 className="cta-title">{title}</h2>
      <Link href={buttonHref} className="btn btn-white">
        {buttonText}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  );
}
