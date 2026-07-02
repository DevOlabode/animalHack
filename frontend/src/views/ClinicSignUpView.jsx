import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { parseAuthResponse } from '../../services/auth';

const API_BASE = '/api';

export default function ClinicSignUpView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [clinicEmail, setClinicEmail] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/signup/clinic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          clinic: {
            name: clinicName,
            description,
            address,
            phone,
            email: clinicEmail || email,
            operatingHours,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Clinic registration failed');
      }

      setAuth(parseAuthResponse(data));
      navigate('/');
    } catch (err) {
      setError(err instanceof TypeError ? 'Could not connect to the server.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      wide
      title="Register your clinic"
      subtitle="Create a clinic account to manage appointments and patient records."
    >
      {error && <div className="alert alert-error">{error}</div>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <h2 className="section-title">Account</h2>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="name">Contact name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Login email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        </div>

        <h2 className="section-title">Clinic profile</h2>
        <div className="form-group">
          <label htmlFor="clinicName">Clinic name</label>
          <input id="clinicName" type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
        </div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label htmlFor="clinicEmail">Public clinic email</label>
            <input id="clinicEmail" type="email" value={clinicEmail} onChange={(e) => setClinicEmail(e.target.value)} placeholder="Defaults to login email" />
          </div>
          <div className="form-group">
            <label htmlFor="operatingHours">Operating hours</label>
            <input id="operatingHours" type="text" value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)} placeholder="Mon–Fri 9:00 AM – 6:00 PM" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Registering clinic...' : 'Register clinic'}
        </button>
      </form>
      <p className="text-link-block">
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
      <p className="text-link-block">
        Signing up as a pet owner? <Link to="/signup">Pet owner sign up</Link>
      </p>
    </AuthLayout>
  );
}
