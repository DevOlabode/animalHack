import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">P</span>
          <span>PetCare</span>
        </div>
        <nav className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/clinics">Clinics</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
        <p className="footer-copy">Digital veterinary care for pet owners and clinics.</p>
      </div>
    </footer>
  );
}
