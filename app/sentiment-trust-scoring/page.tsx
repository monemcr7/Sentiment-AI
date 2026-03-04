import { getProductDetail } from '@/lib/api';
import SubproductClient from '@/components/SubproductClient';

export default async function SentimentTrustScoringPage() {
  const data = await getProductDetail('sentiment-trust-scoring');
  return <SubproductClient data={data} />;
}
