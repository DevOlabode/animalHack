import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { fetchOwnerAppointments, updateAppointmentStatus } from '../../services/api';

const statusClass = { pending: 'badge-pending', confirmed: 'badge-confirmed', cancelled: 'badge-cancelled', completed: 'badge-completed' };

export default function OwnerAppointmentsView() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const load = () => fetchOwnerAppointments().then(setAppointments).catch((e) => setError(e.message));

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    await updateAppointmentStatus(id, 'cancelled');
    load();
  };

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">My appointments</h1>
          <p className="page-subtitle">View and manage your upcoming visits.</p>
        </div>
        <Link to="/clinics" className="btn btn-primary">Book appointment</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {appointments.length === 0 ? (
        <div className="card empty-state"><p className="text-muted">No appointments yet.</p></div>
      ) : (
        <div className="dashboard-grid">
          {appointments.map((a) => (
            <div key={a._id} className="card">
              <div className="dashboard-header" style={{ marginBottom: 0 }}>
                <div>
                  <h3>{a.pet?.name ?? 'Pet'} — {a.clinic?.name}</h3>
                  <p className="text-muted">{new Date(a.date).toLocaleDateString()} at {a.time}</p>
                  <p>{a.reason}</p>
                  <span className={`badge ${statusClass[a.status]}`}>{a.status}</span>
                </div>
                {(a.status === 'pending' || a.status === 'confirmed') && (
                  <button type="button" className="btn btn-danger" onClick={() => cancel(a._id)}>Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
