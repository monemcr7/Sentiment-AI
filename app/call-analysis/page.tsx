import { getProductDetail } from '@/lib/api';
import SubproductClient from '@/components/SubproductClient';

export default async function CallAnalysisPage() {
  const data = await getProductDetail('call-analysis');
  return <SubproductClient data={data} />;
}
