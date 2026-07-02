import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { createPet, fetchPet, updatePet } from '../../services/pets';

const emptyForm = {
  name: '',
  species: '',
  breed: '',
  dateOfBirth: '',
  weight: '',
  sex: 'unknown',
  microchipNumber: '',
  allergies: '',
  medicalConditions: '',
  emergencyContact: '',
  photoUrl: '',
};

export default function PetFormView() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    fetchPet(id)
      .then((pet) => {
        setForm({
          name: pet.name,
          species: pet.species,
          breed: pet.breed,
          dateOfBirth: pet.dateOfBirth?.slice(0, 10) ?? '',
          weight: String(pet.weight),
          sex: pet.sex,
          microchipNumber: pet.microchipNumber ?? '',
          allergies: pet.allergies ?? '',
          medicalConditions: pet.medicalConditions ?? '',
          emergencyContact: pet.emergencyContact,
          photoUrl: pet.photoUrl ?? '',
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1_500_000) {
      setError('Photo must be smaller than 1.5 MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateField('photoUrl', reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        ...form,
        weight: Number(form.weight),
      };

      if (isEdit) {
        await updatePet(id, payload);
        navigate(`/pets/${id}`);
      } else {
        const pet = await createPet(payload);
        navigate(`/pets/${pet._id}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
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

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">{isEdit ? 'Edit pet' : 'Add a pet'}</h1>
          <p className="page-subtitle">
            {isEdit ? 'Update your pet profile information.' : 'Create a profile for your pet.'}
          </p>
        </div>
        <Link to={isEdit ? `/pets/${id}` : '/pets'} className="btn btn-secondary">Cancel</Link>
      </div>

      <div className="card card-xl">
        {error && <div className="alert alert-error">{error}</div>}

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="pet-photo-upload">
            <div className="pet-photo-preview">
              {form.photoUrl ? (
                <img src={form.photoUrl} alt="Pet preview" />
              ) : (
                <span>No photo</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="photo">Pet photo (optional)</label>
              <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
              <span className="form-hint">JPG or PNG, max 1.5 MB</span>
            </div>
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="name">Pet name</label>
              <input id="name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="species">Species</label>
              <input id="species" value={form.species} onChange={(e) => updateField('species', e.target.value)} required />
            </div>
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="breed">Breed</label>
              <input id="breed" value={form.breed} onChange={(e) => updateField('breed', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <select id="sex" value={form.sex} onChange={(e) => updateField('sex', e.target.value)} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of birth</label>
              <input
                id="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => updateField('dateOfBirth', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={form.weight}
                onChange={(e) => updateField('weight', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="microchipNumber">Microchip number (optional)</label>
            <input
              id="microchipNumber"
              value={form.microchipNumber}
              onChange={(e) => updateField('microchipNumber', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="allergies">Allergies</label>
            <textarea
              id="allergies"
              value={form.allergies}
              onChange={(e) => updateField('allergies', e.target.value)}
              placeholder="List any known allergies"
            />
          </div>

          <div className="form-group">
            <label htmlFor="medicalConditions">Existing medical conditions</label>
            <textarea
              id="medicalConditions"
              value={form.medicalConditions}
              onChange={(e) => updateField('medicalConditions', e.target.value)}
              placeholder="List any ongoing conditions"
            />
          </div>

          <div className="form-group">
            <label htmlFor="emergencyContact">Emergency contact</label>
            <input
              id="emergencyContact"
              value={form.emergencyContact}
              onChange={(e) => updateField('emergencyContact', e.target.value)}
              placeholder="Name and phone number"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Save changes' : 'Add pet'}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
