import { getProductPage } from '@/lib/api';
import ProductClient from './ProductClient';

export default async function ProductPage() {
  const data = await getProductPage();
  return <ProductClient data={data} />;
}
