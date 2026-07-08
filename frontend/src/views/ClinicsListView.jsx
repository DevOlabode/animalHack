import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useEffect, useState } from 'react';
import { fetchClinics } from '../../services/api';

export default function ClinicsListView() {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinics().then(setClinics).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Browse clinics</h1>
          <p className="page-subtitle">Find a veterinary clinic and book an appointment.</p>
        </div>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="loading-screen" style={{ minHeight: '30vh' }}><div className="spinner" /></div>
      ) : (
        <div className="pet-grid">
          {clinics.map((c) => (
            <Link key={c._id} to={`/clinics/${c._id}`} className="pet-card">
              <div className="pet-card-body">
                <h3>{c.name}</h3>
                <p className="text-muted">{c.address}</p>
                <p className="pet-card-meta">{c.phone} · {c.operatingHours}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
