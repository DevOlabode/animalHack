import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleLogout() {
    await logout();
    setUser(null);
    navigate('/signin');
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
