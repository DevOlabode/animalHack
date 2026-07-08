import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { IconCalendar } from '../components/icons';
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
      <PageHeader
        eyebrow="Schedule"
        title="My appointments"
        subtitle="View, track, and cancel your upcoming veterinary visits."
        actions={<Link to="/clinics" className="btn btn-primary">Book appointment</Link>}
      />

      {error && <div className="alert alert-error">{error}</div>}

      {appointments.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={IconCalendar}
            title="No appointments yet"
            description="Browse participating clinics and request your first visit."
            action={<Link to="/clinics" className="btn btn-primary">Find a clinic</Link>}
          />
        </div>
      ) : (
        <div className="dashboard-grid">
          {appointments.map((a) => (
            <div key={a._id} className="card appointment-card">
              <div className="appointment-card-header">
                <div>
                  <h3>{a.pet?.name ?? 'Pet'}</h3>
                  <p className="text-muted">{a.clinic?.name}</p>
                  <div className="appointment-card-meta">
                    <span className="appointment-date">
                      {new Date(a.date).toLocaleDateString()} at {a.time}
                    </span>
                    <span className={`badge ${statusClass[a.status]}`}>{a.status}</span>
                  </div>
                </div>
                {(a.status === 'pending' || a.status === 'confirmed') && (
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => cancel(a._id)}>Cancel</button>
                )}
              </div>
              <p>{a.reason}</p>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
