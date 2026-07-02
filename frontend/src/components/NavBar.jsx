import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  async function handleLogout() {
    await logout();
    clearAuth();
    navigate('/signin');
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
