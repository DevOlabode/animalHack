import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import Tabs from '../components/Tabs';
import { fetchPet } from '../../services/pets';
import {
  fetchTimeline, fetchPrescriptions, createDiagnosis, createPrescription, createReminder,
} from '../../services/api';

export default function PatientDetailView() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [tab, setTab] = useState('timeline');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [diagForm, setDiagForm] = useState({ diagnosis: '', clinicalNotes: '', treatmentPlan: '' });
  const [rxForm, setRxForm] = useState({ medicationName: '', dosage: '', frequency: '', duration: '', instructions: '' });
  const [remForm, setRemForm] = useState({ type: 'medication', title: '', message: '', dueDate: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [p, t, rx] = await Promise.all([
        fetchPet(id),
        fetchTimeline(id),
        fetchPrescriptions(id),
      ]);
      setPet(p);
      setTimeline(t);
      setPrescriptions(rx);
      setError('');
    } catch (e) {
      setError(e.message);
      setPet(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const submitDiagnosis = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createDiagnosis({ petId: id, ...diagForm });
      setSuccess('Diagnosis recorded');
      setDiagForm({ diagnosis: '', clinicalNotes: '', treatmentPlan: '' });
      load();
    } catch (err) { setError(err.message); }
  };

  const submitRx = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createPrescription({ petId: id, ...rxForm });
      setSuccess('Prescription added');
      setRxForm({ medicationName: '', dosage: '', frequency: '', duration: '', instructions: '' });
      load();
    } catch (err) { setError(err.message); }
  };

  const submitReminder = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createReminder({ petId: id, ...remForm });
      setSuccess('Reminder scheduled');
      setRemForm({ type: 'medication', title: '', message: '', dueDate: '' });
      load();
    } catch (err) { setError(err.message); }
  };

  if (loading) {
    return <AppShell><div className="loading-screen" style={{ minHeight: '40vh' }}><div className="spinner" /></div></AppShell>;
  }

  if (!pet) {
    return (
      <AppShell>
        <div className="card">
          <h1 className="page-title">Patient not found</h1>
          <p className="text-muted">{error || 'This patient record could not be loaded.'}</p>
          <Link to="/patients" className="btn btn-secondary" style={{ marginTop: '1rem' }}>Back to patients</Link>
        </div>
      </AppShell>
    );
  }

  const vetTabs = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'diagnosis', label: 'Diagnosis' },
    { id: 'prescription', label: 'Prescription' },
    { id: 'reminder', label: 'Reminder' },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Patient record"
        title={pet.name}
        subtitle={`${pet.species} · ${pet.breed} · ${pet.age}`}
        actions={<Link to="/patients" className="btn btn-secondary">Back to patients</Link>}
      />
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <Tabs tabs={vetTabs} active={tab} onChange={setTab} />

      {tab === 'timeline' && (
        <div className="card">
          <h2 className="section-title">Medical timeline</h2>
          {timeline.length === 0 ? <p className="text-muted">No records yet.</p> : (
            <div className="timeline">
              {timeline.map((entry, i) => (
                <div key={i} className="timeline-item">
                  <span className="badge">{entry.type}</span>
                  <strong>{entry.title}</strong>
                  <p className="text-muted">{new Date(entry.date).toLocaleString()}</p>
                  {entry.description && <p>{entry.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'diagnosis' && (
        <div className="card card-xl">
          <h2 className="section-title">Record diagnosis</h2>
          <form className="form-grid" onSubmit={submitDiagnosis}>
            <div className="form-group"><label>Diagnosis</label><input value={diagForm.diagnosis} onChange={(e) => setDiagForm({ ...diagForm, diagnosis: e.target.value })} required /></div>
            <div className="form-group"><label>Clinical notes</label><textarea value={diagForm.clinicalNotes} onChange={(e) => setDiagForm({ ...diagForm, clinicalNotes: e.target.value })} /></div>
            <div className="form-group"><label>Treatment plan</label><textarea value={diagForm.treatmentPlan} onChange={(e) => setDiagForm({ ...diagForm, treatmentPlan: e.target.value })} /></div>
            <button type="submit" className="btn btn-primary">Save diagnosis</button>
          </form>
        </div>
      )}

      {tab === 'prescription' && (
        <div className="card card-xl">
          <h2 className="section-title">Prescribe medication</h2>
          <form className="form-grid" onSubmit={submitRx}>
            <div className="form-grid form-grid-2">
              <div className="form-group"><label>Medication</label><input value={rxForm.medicationName} onChange={(e) => setRxForm({ ...rxForm, medicationName: e.target.value })} required /></div>
              <div className="form-group"><label>Dosage</label><input value={rxForm.dosage} onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })} required /></div>
            </div>
            <div className="form-grid form-grid-2">
              <div className="form-group"><label>Frequency</label><input value={rxForm.frequency} onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })} required /></div>
              <div className="form-group"><label>Duration</label><input value={rxForm.duration} onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })} required /></div>
            </div>
            <div className="form-group"><label>Instructions</label><textarea value={rxForm.instructions} onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })} /></div>
            <button type="submit" className="btn btn-primary">Save prescription</button>
          </form>
          {prescriptions.length > 0 && (
            <>
              <h3 className="section-title" style={{ marginTop: '2rem' }}>Active prescriptions</h3>
              {prescriptions.filter((p) => p.isActive).map((p) => (
                <p key={p._id}>{p.medicationName} — {p.dosage}, {p.frequency}</p>
              ))}
            </>
          )}
        </div>
      )}

      {tab === 'reminder' && (
        <div className="card card-xl">
          <h2 className="section-title">Schedule reminder</h2>
          <form className="form-grid" onSubmit={submitReminder}>
            <div className="form-group">
              <label>Type</label>
              <select value={remForm.type} onChange={(e) => setRemForm({ ...remForm, type: e.target.value })}>
                <option value="medication">Medication</option>
                <option value="vaccination">Vaccination</option>
                <option value="follow_up">Follow-up</option>
                <option value="care_instruction">Care instruction</option>
              </select>
            </div>
            <div className="form-group"><label>Title</label><input value={remForm.title} onChange={(e) => setRemForm({ ...remForm, title: e.target.value })} required /></div>
            <div className="form-group"><label>Message</label><textarea value={remForm.message} onChange={(e) => setRemForm({ ...remForm, message: e.target.value })} /></div>
            <div className="form-group"><label>Due date</label><input type="datetime-local" value={remForm.dueDate} onChange={(e) => setRemForm({ ...remForm, dueDate: e.target.value })} required /></div>
            <button type="submit" className="btn btn-primary">Schedule reminder</button>
          </form>
        </div>
      )}
    </AppShell>
  );
}
