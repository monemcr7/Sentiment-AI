import { getHomePage } from '@/lib/api';
import HomeClient from './HomeClient';
import Link from 'next/link';

export default async function HomePage() {
  try {
    const data = await getHomePage();
    return <HomeClient data={data} />;
  } catch (error) {
    console.error('Failed to load home page content:', error);

    return (
      <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
        <section style={{ maxWidth: '640px', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '0.75rem' }}>We are updating this page</h1>
          <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
            The content service is temporarily unavailable. Please try again shortly.
          </p>
          <Link href="/contact" className="btn btn-dark">
            Contact us
          </Link>
        </section>
      </main>
    );
  }
}
