import ServicePage from '../components/ServicePage';
import { getServiceMetadata } from '../service-pages';

export const metadata = getServiceMetadata('erp-development');

export default function ErpDevelopmentPage() {
  return <ServicePage slug="erp-development" />;
}
