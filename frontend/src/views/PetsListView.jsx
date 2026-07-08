import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { IconPaw } from '../components/icons';
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
      <PageHeader
        eyebrow="Your pets"
        title="My pets"
        subtitle="Profiles, medical history, and documents for each of your pets."
        actions={<Link to="/pets/new" className="btn btn-primary">Add pet</Link>}
      />

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-screen" style={{ minHeight: '30vh' }}>
          <div className="spinner" aria-label="Loading" />
        </div>
      ) : pets.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={IconPaw}
            title="No pets yet"
            description="Add your first pet to start building their medical profile and book appointments."
            action={<Link to="/pets/new" className="btn btn-primary">Add your first pet</Link>}
          />
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
