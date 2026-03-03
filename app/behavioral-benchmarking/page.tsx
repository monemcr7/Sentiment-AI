import { getProductDetail } from '@/lib/api';
import SubproductClient from '@/components/SubproductClient';

export default async function BehavioralBenchmarkingPage() {
  const data = await getProductDetail('behavioral-benchmarking');
  return <SubproductClient data={data} />;
}
