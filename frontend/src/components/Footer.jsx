import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <BrandLogo />
        </div>
        <nav className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/clinics">Clinics</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
        <p className="footer-copy">Vethra — digital veterinary care for pet owners and clinics.</p>
      </div>
    </footer>
  );
}
