import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import { updateClinicProfile } from '../../services/auth';

export default function ClinicProfileView() {
  const { user, clinic, setAuth } = useAuth();
  const navigate = useNavigate();
  const [contactName, setContactName] = useState(user?.name ?? '');
  const [loginEmail, setLoginEmail] = useState(user?.email ?? '');
  const [clinicName, setClinicName] = useState(clinic?.name ?? '');
  const [description, setDescription] = useState(clinic?.description ?? '');
  const [address, setAddress] = useState(clinic?.address ?? '');
  const [phone, setPhone] = useState(clinic?.phone ?? '');
  const [clinicEmail, setClinicEmail] = useState(clinic?.email ?? '');
  const [operatingHours, setOperatingHours] = useState(clinic?.operatingHours ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const auth = await updateClinicProfile({
        contactName,
        loginEmail,
        name: clinicName,
        description,
        address,
        phone,
        email: clinicEmail,
        operatingHours,
        ...(newPassword ? { currentPassword, newPassword } : {}),
      });

      setAuth(auth);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Clinic profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Edit Clinic Profile</h1>
          <p className="page-subtitle">Update your clinic details and login credentials.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
          Back to dashboard
        </button>
      </div>

      <div className="card card-xl">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <h2 className="section-title">Account</h2>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="contactName">Contact name</label>
              <input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="loginEmail">Login email</label>
              <input id="loginEmail" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            </div>
          </div>

          <h2 className="section-title">Clinic information</h2>
          <div className="form-group">
            <label htmlFor="clinicName">Clinic name</label>
            <input id="clinicName" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="clinicEmail">Public clinic email</label>
              <input id="clinicEmail" type="email" value={clinicEmail} onChange={(e) => setClinicEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="operatingHours">Operating hours</label>
              <input id="operatingHours" value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)} required />
            </div>
          </div>

          <h2 className="section-title">Change password</h2>
          <p className="form-hint">Leave blank to keep your current password.</p>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="currentPassword">Current password</label>
              <input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New password</label>
              <input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm new password</label>
            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </button>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
