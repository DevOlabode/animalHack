import Navbar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

function LoggedInHome() {
  const { user } = useAuth();

  return (
    <div>
      <section>{<Navbar />}</section>
      <h2>Welcome, {user?.name}</h2>
      <p>Logged in as {user?.email}</p>
    </div>
  );
}

export default LoggedInHome;
