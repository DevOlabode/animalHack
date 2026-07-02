import { useAuth } from '../context/AuthContext';
import OwnerProfileView from './OwnerProfileView';
import ClinicProfileView from './ClinicProfileView';

export default function ProfileView() {
  const { user } = useAuth();

  if (user?.role === 'vet') {
    return <ClinicProfileView />;
  }

  return <OwnerProfileView />;
}
