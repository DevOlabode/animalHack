import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import { fetchClinic, fetchClinicSlots, bookAppointment } from '../../services/api';
import { fetchPets } from '../../services/pets';

export default function ClinicDetailView() {
  const { id } = useParams();
  const { user } = useAuth();
  const isOwner = user?.role === 'pet_owner' || user?.role === 'owner';
  const [clinic, setClinic] = useState(null);
  const [pets, setPets] = useState([]);
  const [slots, setSlots] = useState([]);
  const [petId, setPetId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClinic(id).then(setClinic).catch((e) => setError(e.message)).finally(() => setLoading(false));
    if (isOwner) fetchPets().then(setPets).catch(() => {});
  }, [id, isOwner]);

  useEffect(() => {
    if (!date) return;
    fetchClinicSlots(id, date).then(setSlots).catch(() => setSlots([]));
  }, [id, date]);

  const handleBook = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await bookAppointment({ petId, clinicId: id, date, time, reason });
      setSuccess('Appointment requested! The clinic will confirm shortly.');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <AppShell><div className="loading-screen" style={{ minHeight: '40vh' }}><div className="spinner" /></div></AppShell>;

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">{clinic?.name}</h1>
          <p className="page-subtitle">{clinic?.description}</p>
        </div>
        <Link to="/clinics" className="btn btn-secondary">Back</Link>
      </div>

      <div className="card card-xl" style={{ marginBottom: '1.5rem' }}>
        <div className="profile-preview">
          <div className="profile-row"><span className="profile-label">Address</span><span className="profile-value">{clinic?.address}</span></div>
          <div className="profile-row"><span className="profile-label">Phone</span><span className="profile-value">{clinic?.phone}</span></div>
          <div className="profile-row"><span className="profile-label">Email</span><span className="profile-value">{clinic?.email}</span></div>
          <div className="profile-row"><span className="profile-label">Hours</span><span className="profile-value">{clinic?.operatingHours}</span></div>
        </div>
      </div>

      {isOwner ? (
        <div className="card card-xl">
          <h2 className="section-title">Book an appointment</h2>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form className="form-grid" onSubmit={handleBook}>
            <div className="form-group">
              <label>Pet</label>
              <select value={petId} onChange={(e) => setPetId(e.target.value)} required>
                <option value="">Select a pet</option>
                {pets.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required min={new Date().toISOString().slice(0, 10)} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <select value={time} onChange={(e) => setTime(e.target.value)} required>
                  <option value="">Select time</option>
                  {slots.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Reason for visit</label>
              <input value={reason} onChange={(e) => setReason(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Request appointment</button>
          </form>
        </div>
      ) : (
        <div className="card card-xl">
          <h2 className="section-title">Book an appointment</h2>
          <p className="text-muted">Sign in as a pet owner to schedule a visit at this clinic.</p>
          <Link to="/signin" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign in to book</Link>
        </div>
      )}
    </AppShell>
  );
}
