import TermsOfServiceClient from './TermsOfServiceClient';
import { dummyTermsData } from './dummyTermsData';

// Use dummy data until the legal/terms-of-service API is ready.
// When ready: fetch with getLegalPage('terms-of-service') and use API data when it has content.
export default function TermsOfServicePage() {
  return <TermsOfServiceClient data={dummyTermsData} />;
}
