import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
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
      <PageHeader
        eyebrow="Patient directory"
        title="Patients"
        subtitle="Search by pet name, owner name, or microchip number."
      />

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          placeholder="Search patients…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search patients"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {patients.length === 0 ? (
        <div className="card">
          <p className="text-muted">No patients found. Patients appear here after they book an appointment with your clinic.</p>
        </div>
      ) : (
        <div className="pet-grid">
          {patients.map(({ pet, owner }) => (
            <Link key={pet._id} to={`/patients/${pet._id}`} className="pet-card">
              <div className="pet-card-photo">
                <span>{pet.name.charAt(0)}</span>
              </div>
              <div className="pet-card-body">
                <h3>{pet.name}</h3>
                <p className="text-muted">{pet.species} · {pet.breed}</p>
                <p className="pet-card-meta">Owner: {owner?.name}</p>
                {pet.microchipNumber && <p className="text-muted" style={{ fontSize: '0.88rem' }}>Chip: {pet.microchipNumber}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
