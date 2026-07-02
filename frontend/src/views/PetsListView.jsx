import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { fetchPets } from '../../services/pets';

export default function PetsListView() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets()
      .then(setPets)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">My pets</h1>
          <p className="page-subtitle">Manage profiles for all of your pets.</p>
        </div>
        <Link to="/pets/new" className="btn btn-primary">Add pet</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-screen" style={{ minHeight: '30vh' }}>
          <div className="spinner" aria-label="Loading" />
        </div>
      ) : pets.length === 0 ? (
        <div className="card empty-state">
          <h2 className="section-title">No pets yet</h2>
          <p className="text-muted">Add your first pet to start building their medical profile.</p>
          <Link to="/pets/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Add your first pet
          </Link>
        </div>
      ) : (
        <div className="pet-grid">
          {pets.map((pet) => (
            <Link key={pet._id} to={`/pets/${pet._id}`} className="pet-card">
              <div className="pet-card-photo">
                {pet.photoUrl ? (
                  <img src={pet.photoUrl} alt={pet.name} />
                ) : (
                  <span>{pet.name.charAt(0)}</span>
                )}
              </div>
              <div className="pet-card-body">
                <h3>{pet.name}</h3>
                <p className="text-muted">{pet.species} · {pet.breed}</p>
                <p className="pet-card-meta">{pet.age} · {pet.weight} kg</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </AppShell>
  );
}
