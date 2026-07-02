import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';

function ClinicLoggedInView() {
  const { user, clinic } = useAuth();

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">{clinic?.name ?? 'Clinic Dashboard'}</h1>
          <p className="page-subtitle">Manage appointments, patients, and clinic information.</p>
        </div>
        <Link to="/profile" className="btn btn-primary">Edit clinic profile</Link>
      </div>

      <div className="dashboard-grid">
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Contact</div>
            <div className="stat-value">{user?.name}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Phone</div>
            <div className="stat-value">{clinic?.phone ?? '—'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Hours</div>
            <div className="stat-value">{clinic?.operatingHours ?? '—'}</div>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Clinic profile</h2>
          <div className="profile-preview">
            <div className="profile-row">
              <span className="profile-label">Address</span>
              <span className="profile-value">{clinic?.address ?? '—'}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{clinic?.email ?? '—'}</span>
            </div>
            {clinic?.description && (
              <div className="profile-row">
                <span className="profile-label">About</span>
                <span className="profile-value">{clinic.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default ClinicLoggedInView;
