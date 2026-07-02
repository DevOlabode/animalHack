import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import { fetchPets } from '../../services/pets';

function OwnerLoggedInView() {
  const { user } = useAuth();
  const [petCount, setPetCount] = useState(null);

  useEffect(() => {
    fetchPets()
      .then((pets) => setPetCount(pets.length))
      .catch(() => setPetCount(0));
  }, []);

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.name}</h1>
          <p className="page-subtitle">Manage your pets, appointments, and medical records.</p>
        </div>
        <div className="btn-group">
          <Link to="/pets/new" className="btn btn-primary">Add pet</Link>
          <Link to="/profile" className="btn btn-secondary">Edit profile</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Account email</div>
            <div className="stat-value">{user?.email}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pets registered</div>
            <div className="stat-value">{petCount === null ? '...' : petCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Appointments</div>
            <div className="stat-value">Coming soon</div>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Quick actions</h2>
          <div className="btn-group">
            <Link to="/pets" className="btn btn-primary">View my pets</Link>
            <Link to="/pets/new" className="btn btn-secondary">Add a new pet</Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default OwnerLoggedInView;