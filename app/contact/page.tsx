import { getContactPage } from '@/lib/api';
import ContactClient from './ContactClient';

export default async function ContactPage() {
  const data = await getContactPage();
  return <ContactClient data={data} />;
}
