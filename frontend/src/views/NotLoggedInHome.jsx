import { Link } from 'react-router-dom';

export default function NotLoggedInHome() {
  return (
    <div className="page">
      <div className="container hero">
        <div className="brand-badge" style={{ margin: '0 auto 1rem' }}>
          <span className="brand-mark">P</span>
          PetCare Platform
        </div>
        <h1 className="page-title">Digital healthcare for every pet</h1>
        <p className="page-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
          A shared platform where pet owners and veterinary clinics manage medical records,
          book appointments, and track treatment — all in one place.
        </p>
        <div className="hero-actions">
          <Link to="/signin" className="btn btn-secondary">Sign in</Link>
          <Link to="/clinics" className="btn btn-secondary">Browse clinics</Link>
          <Link to="/signup" className="btn btn-primary">Pet owner sign up</Link>
          <Link to="/signup/clinic" className="btn btn-primary">Clinic sign up</Link>
        </div>
        <p style={{ marginTop: '2rem' }}>
          <Link to="/about" className="nav-link">Learn more about PetCare</Link>
        </p>
      </div>
    </div>
  );
}
