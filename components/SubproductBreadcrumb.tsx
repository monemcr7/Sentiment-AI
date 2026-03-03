import Link from 'next/link';

interface SubproductBreadcrumbProps {
  label?: string;
  url?: string;
}

export default function SubproductBreadcrumb({
  label = 'Back to Product',
  url = '/product',
}: SubproductBreadcrumbProps) {
  return (
    <Link href={url} className="subproduct-breadcrumb">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  );
}
