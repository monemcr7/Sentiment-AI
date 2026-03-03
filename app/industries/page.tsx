import { getIndustriesPage } from '@/lib/api';
import IndustriesClient from './IndustriesClient';

export default async function IndustriesPage() {
  const data = await getIndustriesPage();
  return <IndustriesClient data={data} />;
}
