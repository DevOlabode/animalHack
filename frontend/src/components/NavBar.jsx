import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const isPetOwner = user?.role === 'pet_owner' || user?.role === 'owner';

  async function handleLogout() {
    await logout();
    clearAuth();
    navigate('/signin');
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-brand">
          <span className="brand-mark">P</span>
          PetCare
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>
            Dashboard
          </NavLink>
          {isPetOwner && (
            <NavLink to="/pets" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Pets
            </NavLink>
          )}
          <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Profile
          </NavLink>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
