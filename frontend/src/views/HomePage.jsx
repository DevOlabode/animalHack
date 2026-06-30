import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSignIn = () => navigate('/signin');
  const handleSignUp = () => navigate('/signup');

  return (
    <div style={{ maxWidth: 600, margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
      <h1>PetCare Platform</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        A shared digital healthcare platform for pets where pet owners and veterinary clinics
        can manage medical records, book appointments, track diagnoses, prescribe treatments,
        and monitor follow-up care from a single system.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/signin">
          <button style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>Sign In</button>
        </Link>
        <Link to="/signup">
          <button style={{ padding: '0.75rem 2rem', fontSize: '1rem', background: '#007bff', color: 'white', border: 'none' }}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}