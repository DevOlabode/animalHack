import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { deletePet, fetchPet } from '../../services/pets';

export default function PetDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPet(id)
      .then(setPet)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${pet.name}'s profile? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      await deletePet(id);
      navigate('/pets');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="loading-screen" style={{ minHeight: '40vh' }}>
          <div className="spinner" aria-label="Loading" />
        </div>
      </AppShell>
    );
  }

  if (error && !pet) {
    return (
      <AppShell>
        <div className="alert alert-error">{error}</div>
        <Link to="/pets" className="btn btn-secondary">Back to pets</Link>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">{pet.name}</h1>
          <p className="page-subtitle">{pet.species} · {pet.breed}</p>
        </div>
        <div className="btn-group">
          <Link to={`/pets/${id}/edit`} className="btn btn-primary">Edit</Link>
          <Link to="/pets" className="btn btn-secondary">Back</Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="pet-detail-grid">
        <div className="card pet-detail-photo-card">
          {pet.photoUrl ? (
            <img src={pet.photoUrl} alt={pet.name} className="pet-detail-photo" />
          ) : (
            <div className="pet-detail-photo pet-detail-photo-placeholder">{pet.name.charAt(0)}</div>
          )}
        </div>

        <div className="pet-detail-info">
          <div className="card">
            <h2 className="section-title">Profile</h2>
            <div className="profile-preview">
              <div className="profile-row">
                <span className="profile-label">Age</span>
                <span className="profile-value">{pet.age}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Date of birth</span>
                <span className="profile-value">{new Date(pet.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Weight</span>
                <span className="profile-value">{pet.weight} kg</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Sex</span>
                <span className="profile-value">{pet.sex}</span>
              </div>
              {pet.microchipNumber && (
                <div className="profile-row">
                  <span className="profile-label">Microchip</span>
                  <span className="profile-value">{pet.microchipNumber}</span>
                </div>
              )}
              <div className="profile-row">
                <span className="profile-label">Emergency contact</span>
                <span className="profile-value">{pet.emergencyContact}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="section-title">Medical information</h2>
            <div className="profile-preview">
              <div className="profile-row">
                <span className="profile-label">Allergies</span>
                <span className="profile-value">{pet.allergies || 'None listed'}</span>
              </div>
              <div className="profile-row">
                <span className="profile-label">Medical conditions</span>
                <span className="profile-value">{pet.medicalConditions || 'None listed'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="section-title">Danger zone</h2>
        <p className="text-muted">Permanently delete this pet profile and all associated data.</p>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
          style={{ marginTop: '1rem' }}
        >
          {deleting ? 'Deleting...' : 'Delete pet'}
        </button>
      </div>
    </AppShell>
  );
}
