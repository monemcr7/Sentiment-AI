import { getAboutPage } from '@/lib/api';
import AboutClient from './AboutClient';

export default async function AboutPage() {
  const data = await getAboutPage();
  return <AboutClient data={data} />;
}
