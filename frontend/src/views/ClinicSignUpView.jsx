import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

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
      if (err instanceof TypeError) {
        setError('Could not connect to the server.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = { width: '100%', padding: '0.5rem' };
  const labelStyle = { display: 'block', marginBottom: '0.25rem' };
  const groupStyle = { marginBottom: '1rem' };

  return (
    <div style={{ maxWidth: 520, margin: '2rem auto', padding: '1rem' }}>
      <h2>Register Your Clinic</h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Create a clinic account to manage appointments and patient records.
      </p>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: '1rem' }}>Account Details</h3>
        <div style={groupStyle}>
          <label htmlFor="name" style={labelStyle}>Contact Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="email" style={labelStyle}>Login Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>

        <h3 style={{ margin: '1.5rem 0 1rem' }}>Clinic Profile</h3>
        <div style={groupStyle}>
          <label htmlFor="clinicName" style={labelStyle}>Clinic Name</label>
          <input
            id="clinicName"
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="description" style={labelStyle}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="address" style={labelStyle}>Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="phone" style={labelStyle}>Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="clinicEmail" style={labelStyle}>Clinic Email (optional)</label>
          <input
            id="clinicEmail"
            type="email"
            value={clinicEmail}
            onChange={(e) => setClinicEmail(e.target.value)}
            placeholder="Defaults to login email"
            style={fieldStyle}
          />
        </div>
        <div style={groupStyle}>
          <label htmlFor="operatingHours" style={labelStyle}>Operating Hours</label>
          <input
            id="operatingHours"
            type="text"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            placeholder="e.g. Mon-Fri 9:00 AM - 6:00 PM"
            required
            style={fieldStyle}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '0.75rem', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Registering clinic...' : 'Register Clinic'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
      <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>
        Signing up as a pet owner? <Link to="/signup">Pet owner sign up</Link>
      </p>
    </div>
  );
}
