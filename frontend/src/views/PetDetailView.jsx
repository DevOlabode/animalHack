import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import Tabs from '../components/Tabs';
import { deletePet, fetchPet } from '../../services/pets';
import { fetchTimeline, fetchPrescriptions, fetchDocuments, uploadDocument } from '../../services/api';

export default function PetDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tab, setTab] = useState('profile');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [docForm, setDocForm] = useState({ title: '', type: 'vaccination_certificate', fileName: '', mimeType: '', dataUrl: '' });

  const loadMedical = () => Promise.all([
    fetchTimeline(id).then(setTimeline).catch(() => setTimeline([])),
    fetchPrescriptions(id).then(setPrescriptions).catch(() => setPrescriptions([])),
    fetchDocuments(id).then(setDocuments).catch(() => setDocuments([])),
  ]);

  useEffect(() => {
    fetchPet(id)
      .then((p) => { setPet(p); return loadMedical(); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${pet.name}'s profile? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deletePet(id);
      navigate('/pets');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDocForm((f) => ({
        ...f,
        fileName: file.name,
        mimeType: file.type,
        dataUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const submitDocument = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const typeMap = {
      vaccination_certificate: 'vaccination',
      lab_report: 'lab',
      blood_work: 'blood',
      xray: 'xray',
      referral: 'referral',
    };
    const mimeToFileType = (mime) => {
      if (mime === 'application/pdf') return 'pdf';
      if (mime === 'image/jpeg' || mime === 'image/jpg') return 'jpg';
      if (mime === 'image/png') return 'png';
      return 'pdf';
    };
    try {
      await uploadDocument(id, {
        petId: id,
        title: docForm.title,
        documentType: typeMap[docForm.type] || 'other',
        fileType: mimeToFileType(docForm.mimeType),
        fileUrl: docForm.dataUrl,
      });
      setSuccess('Document uploaded');
      setDocForm({ title: '', type: 'vaccination_certificate', fileName: '', mimeType: '', dataUrl: '' });
      loadMedical();
    } catch (err) {
      setError(err.message);
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

  const activeRx = prescriptions.filter((p) => p.isActive);
  const pastRx = prescriptions.filter((p) => !p.isActive);

  const petTabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'prescriptions', label: 'Prescriptions' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Pet profile"
        title={pet.name}
        subtitle={`${pet.species} · ${pet.breed} · ${pet.age}`}
        actions={(
          <>
            <Link to={`/pets/${id}/edit`} className="btn btn-primary">Edit</Link>
            <Link to="/pets" className="btn btn-secondary">Back</Link>
          </>
        )}
      />

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <Tabs tabs={petTabs} active={tab} onChange={setTab} />

      {tab === 'profile' && (
        <>
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
                  <div className="profile-row"><span className="profile-label">Age</span><span className="profile-value">{pet.age}</span></div>
                  <div className="profile-row"><span className="profile-label">Date of birth</span><span className="profile-value">{new Date(pet.dateOfBirth).toLocaleDateString()}</span></div>
                  <div className="profile-row"><span className="profile-label">Weight</span><span className="profile-value">{pet.weight} kg</span></div>
                  <div className="profile-row"><span className="profile-label">Sex</span><span className="profile-value">{pet.sex}</span></div>
                  {pet.microchipNumber && <div className="profile-row"><span className="profile-label">Microchip</span><span className="profile-value">{pet.microchipNumber}</span></div>}
                  <div className="profile-row"><span className="profile-label">Emergency contact</span><span className="profile-value">{pet.emergencyContact}</span></div>
                </div>
              </div>
              <div className="card">
                <h2 className="section-title">Medical information</h2>
                <div className="profile-preview">
                  <div className="profile-row"><span className="profile-label">Allergies</span><span className="profile-value">{pet.allergies || 'None listed'}</span></div>
                  <div className="profile-row"><span className="profile-label">Medical conditions</span><span className="profile-value">{pet.medicalConditions || 'None listed'}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h2 className="section-title">Danger zone</h2>
            <p className="text-muted">Permanently delete this pet profile and all associated data.</p>
            <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={deleting} style={{ marginTop: '1rem' }}>
              {deleting ? 'Deleting…' : 'Delete pet'}
            </button>
          </div>
        </>
      )}

      {tab === 'timeline' && (
        <div className="card">
          <h2 className="section-title">Medical timeline</h2>
          {timeline.length === 0 ? (
            <p className="text-muted">No medical records yet.</p>
          ) : (
            <div className="timeline">
              {timeline.map((entry, i) => (
                <div key={i} className="timeline-item">
                  <span className="badge">{entry.type.replace('_', ' ')}</span>
                  <strong>{entry.title}</strong>
                  <p className="text-muted">{new Date(entry.date).toLocaleString()}</p>
                  {entry.description && <p>{entry.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'prescriptions' && (
        <div className="dashboard-grid">
          <div className="card">
            <h2 className="section-title">Active prescriptions</h2>
            {activeRx.length === 0 ? <p className="text-muted">No active prescriptions.</p> : activeRx.map((p) => (
              <div key={p._id} className="list-item">
                <div>
                  <strong>{p.medicationName}</strong>
                  <p className="text-muted">{p.dosage} · {p.frequency} · {p.duration}</p>
                  {p.instructions && <p>{p.instructions}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h2 className="section-title">Previous prescriptions</h2>
            {pastRx.length === 0 ? <p className="text-muted">No past prescriptions.</p> : pastRx.map((p) => (
              <div key={p._id} className="list-item">
                <div>
                  <strong>{p.medicationName}</strong>
                  <p className="text-muted">{p.dosage} · {p.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'documents' && (
        <div className="dashboard-grid">
          <div className="card card-xl">
            <h2 className="section-title">Upload document</h2>
            <form className="form-grid" onSubmit={submitDocument}>
              <div className="form-group">
                <label>Title</label>
                <input value={docForm.title} onChange={(e) => setDocForm({ ...docForm, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Document type</label>
                <select value={docForm.type} onChange={(e) => setDocForm({ ...docForm, type: e.target.value })}>
                  <option value="vaccination_certificate">Vaccination certificate</option>
                  <option value="lab_report">Lab report</option>
                  <option value="blood_work">Blood work</option>
                  <option value="xray">X-ray</option>
                  <option value="referral">Referral document</option>
                </select>
              </div>
              <div className="form-group">
                <label>File (PDF, JPG, PNG)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} required />
              </div>
              <button type="submit" className="btn btn-primary">Upload</button>
            </form>
          </div>
          <div className="card">
            <h2 className="section-title">Uploaded documents</h2>
            {documents.length === 0 ? <p className="text-muted">No documents uploaded.</p> : documents.map((d) => (
              <div key={d._id} className="list-item">
                <div>
                  <strong>{d.title}</strong>
                  <p className="text-muted">{d.documentType} · {d.fileType?.toUpperCase()}</p>
                </div>
                {d.fileUrl && (
                  <a href={d.fileUrl} download={`${d.title}.${d.fileType}`} className="btn btn-secondary btn-sm">Download</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
