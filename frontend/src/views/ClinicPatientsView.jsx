import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { fetchPatients, searchPatients } from '../../services/api';

export default function ClinicPatientsView() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const load = () => fetchPatients().then(setPatients).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return load();
    searchPatients(query).then(setPatients).catch((e) => setError(e.message));
  };

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Patients</h1>
          <p className="page-subtitle">Search by pet name, owner name, or microchip.</p>
        </div>
      </div>
      <form className="form-grid" style={{ maxWidth: 480, marginBottom: '1.5rem' }} onSubmit={handleSearch}>
        <div className="form-group">
          <input placeholder="Search patients..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="pet-grid">
        {patients.map(({ pet, owner }) => (
          <Link key={pet._id} to={`/patients/${pet._id}`} className="pet-card">
            <div className="pet-card-body">
              <h3>{pet.name}</h3>
              <p className="text-muted">{pet.species} · {pet.breed}</p>
              <p className="pet-card-meta">Owner: {owner?.name}</p>
              {pet.microchipNumber && <p className="text-muted">Chip: {pet.microchipNumber}</p>}
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
