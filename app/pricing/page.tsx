import { getPricingPage } from '@/lib/api';
import PricingClient from './PricingClient';

export default async function PricingPage() {
  const data = await getPricingPage();
  return <PricingClient data={data} />;
}
