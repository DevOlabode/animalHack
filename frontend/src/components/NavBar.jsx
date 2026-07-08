import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import { useAuth } from '../context/AuthContext';
import { IconMenu, IconClose } from './icons';

function NavLinks({ user, isOwner, isVet, onNavigate, mobile = false }) {
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}${mobile ? ' nav-link-mobile' : ''}`;

  if (user) {
    return (
      <>
        <NavLink to="/" className={linkClass} end onClick={onNavigate}>Dashboard</NavLink>
        {isOwner && (
          <>
            <NavLink to="/pets" className={linkClass} onClick={onNavigate}>Pets</NavLink>
            <NavLink to="/clinics" className={linkClass} onClick={onNavigate}>Clinics</NavLink>
            <NavLink to="/appointments" className={linkClass} onClick={onNavigate}>Appointments</NavLink>
            <NavLink to="/reminders" className={linkClass} onClick={onNavigate}>Reminders</NavLink>
          </>
        )}
        {isVet && (
          <>
            <NavLink to="/clinic/appointments" className={linkClass} onClick={onNavigate}>Appointments</NavLink>
            <NavLink to="/patients" className={linkClass} onClick={onNavigate}>Patients</NavLink>
          </>
        )}
        <NavLink to="/profile" className={linkClass} onClick={onNavigate}>Profile</NavLink>
      </>
    );
  }

  return (
    <>
      <NavLink to="/" className={linkClass} end onClick={onNavigate}>Home</NavLink>
      <NavLink to="/about" className={linkClass} onClick={onNavigate}>About</NavLink>
      <NavLink to="/clinics" className={linkClass} onClick={onNavigate}>Browse clinics</NavLink>
    </>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const isOwner = user?.role === 'pet_owner' || user?.role === 'owner';
  const isVet = user?.role === 'vet';

  async function handleLogout() {
    await logout();
    clearAuth();
    setMenuOpen(false);
    navigate('/signin');
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <span className="brand-mark">P</span>
          PetCare
        </Link>

        <nav className="nav-links nav-links-desktop" aria-label="Main">
          <NavLinks user={user} isOwner={isOwner} isVet={isVet} />
          {user ? (
            <button type="button" className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/signin" className="btn btn-ghost">Sign in</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {menuOpen && (
        <>
          <button type="button" className="nav-overlay" aria-label="Close menu" onClick={closeMenu} />
          <nav className="nav-drawer" aria-label="Mobile">
            <NavLinks user={user} isOwner={isOwner} isVet={isVet} onNavigate={closeMenu} mobile />
            <div className="nav-drawer-actions">
              {user ? (
                <button type="button" className="btn btn-secondary btn-block" onClick={handleLogout}>Logout</button>
              ) : (
                <>
                  <Link to="/signin" className="btn btn-secondary btn-block" onClick={closeMenu}>Sign in</Link>
                  <Link to="/signup" className="btn btn-primary btn-block" onClick={closeMenu}>Sign up</Link>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
