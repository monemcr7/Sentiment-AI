import { getHowItWorksPage } from '@/lib/api';
import HowItWorksClient from './HowItWorksClient';

export default async function HowItWorksPage() {
  const data = await getHowItWorksPage();
  return <HowItWorksClient data={data} />;
}
