import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const isOwner = user?.role === 'pet_owner' || user?.role === 'owner';
  const isVet = user?.role === 'vet';

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
          {user ? (
            <>
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Dashboard</NavLink>
              {isOwner && (
                <>
                  <NavLink to="/pets" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Pets</NavLink>
                  <NavLink to="/clinics" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Clinics</NavLink>
                  <NavLink to="/appointments" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Appointments</NavLink>
                  <NavLink to="/reminders" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Reminders</NavLink>
                </>
              )}
              {isVet && (
                <>
                  <NavLink to="/clinic/appointments" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Appointments</NavLink>
                  <NavLink to="/patients" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Patients</NavLink>
                </>
              )}
              <NavLink to="/profile" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Profile</NavLink>
              <button type="button" className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
              <NavLink to="/clinics" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Browse clinics</NavLink>
              <Link to="/signin" className="btn btn-ghost">Sign in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
