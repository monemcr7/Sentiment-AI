import { getProductDetail } from '@/lib/api';
import SubproductClient from '@/components/SubproductClient';

export default async function SecurityOverviewPage() {
  const data = await getProductDetail('security-overview');
  return <SubproductClient data={data} />;
}
