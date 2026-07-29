import ServicePage from '../components/ServicePage';
import { getServiceMetadata } from '../service-pages';

export const metadata = getServiceMetadata('crm-automation');

export default function CrmAutomationPage() {
  return <ServicePage slug="crm-automation" />;
}
