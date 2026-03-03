import { getLegalPage } from '@/lib/api';
import PrivacyPolicyClient from './PrivacyPolicyClient';

export default async function PrivacyPolicyPage() {
  const data = await getLegalPage('privacy-policy');
  return <PrivacyPolicyClient data={data} />;
}
