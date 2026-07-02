import AppShell from '../components/AppShell';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function OwnerLoggedInView() {
  const { user } = useAuth();

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.name}</h1>
          <p className="page-subtitle">Manage your pets, appointments, and medical records.</p>
        </div>
        <Link to="/profile" className="btn btn-primary">Edit profile</Link>
      </div>

      <div className="dashboard-grid">
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Account email</div>
            <div className="stat-value">{user?.email}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Role</div>
            <div className="stat-value">Pet owner</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pets</div>
            <div className="stat-value">Coming soon</div>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Your dashboard</h2>
          <p className="text-muted">
            Add pets, book appointments, and view medical timelines from here as those features roll out.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

export default OwnerLoggedInView;
