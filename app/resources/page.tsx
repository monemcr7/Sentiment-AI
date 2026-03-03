import { getResourcesPage } from '@/lib/api';
import ResourcesClient from './ResourcesClient';

export default async function ResourcesPage() {
  const data = await getResourcesPage();
  return <ResourcesClient data={data} />;
}
