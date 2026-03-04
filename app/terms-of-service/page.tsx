import { getLegalPage } from '@/lib/api';
import TermsOfServiceClient from './TermsOfServiceClient';
import { dummyTermsData } from './dummyTermsData';

export default async function TermsOfServicePage() {
  let data;
  try {
    data = await getLegalPage('terms-of-service');
    if (!data?.content && !data?.hero?.title) data = dummyTermsData;
  } catch {
    data = dummyTermsData;
  }
  return <TermsOfServiceClient data={data} />;
}
