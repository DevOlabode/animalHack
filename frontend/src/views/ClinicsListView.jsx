import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { useEffect, useState } from 'react';
import { fetchClinics } from '../../services/api';
import { IconUsers } from '../components/icons';

export default function ClinicsListView() {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinics().then(setClinics).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Find care"
        title="Browse clinics"
        subtitle="Discover veterinary clinics and book an appointment for your pet."
      />

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-screen" style={{ minHeight: '30vh' }}><div className="spinner" aria-label="Loading" /></div>
      ) : clinics.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={IconUsers}
            title="No clinics yet"
            description="Clinic profiles will appear here once veterinary partners join Vethra."
          />
        </div>
      ) : (
        <div className="pet-grid">
          {clinics.map((c) => (
            <Link key={c._id} to={`/clinics/${c._id}`} className="pet-card">
              <div className="clinic-card-icon">
                <IconUsers />
              </div>
              <div className="pet-card-body">
                <h3>{c.name}</h3>
                <p className="text-muted">{c.address}</p>
                <p className="pet-card-meta">{c.phone}</p>
                <p className="text-muted" style={{ marginTop: '0.35rem', fontSize: '0.88rem' }}>{c.operatingHours}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
