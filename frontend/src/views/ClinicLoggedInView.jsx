import Navbar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

function ClinicLoggedInView() {
  const { user, clinic } = useAuth();

  return (
    <div>
      <section>{<Navbar />}</section>
      <h2>{clinic?.name ?? 'Clinic Dashboard'}</h2>
      <p>Welcome, {user?.name}</p>
      <p>{clinic?.address}</p>
      <p>{clinic?.phone} · {clinic?.email}</p>
      <p>Hours: {clinic?.operatingHours}</p>
      {clinic?.description && <p>{clinic.description}</p>}
    </div>
  );
}

export default ClinicLoggedInView;
