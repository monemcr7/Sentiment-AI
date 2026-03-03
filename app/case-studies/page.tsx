import { getCaseStudiesPage } from '@/lib/api';
import CaseStudiesClient from './CaseStudiesClient';

export default async function CaseStudiesPage() {
  const data = await getCaseStudiesPage();
  return <CaseStudiesClient data={data} />;
}
