import ServicePage from '../components/ServicePage';
import { getServiceMetadata } from '../service-pages';

export const metadata = getServiceMetadata('web-development');

export default function WebDevelopmentPage() {
  return <ServicePage slug="web-development" />;
}
