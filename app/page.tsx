import { getHomePage } from '@/lib/api';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const data = await getHomePage();
  return <HomeClient data={data} />;
}
