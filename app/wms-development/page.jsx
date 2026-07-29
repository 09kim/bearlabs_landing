import ServicePage from '../components/ServicePage';
import { getServiceMetadata } from '../service-pages';

export const metadata = getServiceMetadata('wms-development');

export default function WmsDevelopmentPage() {
  return <ServicePage slug="wms-development" />;
}
