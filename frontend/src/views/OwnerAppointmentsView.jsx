import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import CancelReasonModal from '../components/CancelReasonModal';
import { IconCalendar } from '../components/icons';
import { fetchOwnerAppointments, updateAppointmentStatus } from '../../services/api';

const statusClass = {
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  cancelled: 'badge-cancelled',
  completed: 'badge-completed',
};

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'completed', label: 'Completed' },
];

export default function OwnerAppointmentsView() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelId, setCancelId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchOwnerAppointments();
      setAppointments(data);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const visible = filter === 'all'
    ? appointments
    : appointments.filter((a) => a.status === filter);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Schedule"
        title="My appointments"
        subtitle="View, track, and cancel your upcoming veterinary visits."
        actions={<Link to="/clinics" className="btn btn-primary">Book appointment</Link>}
      />

      {error && <div className="alert alert-error">{error}</div>}

      <div className="filter-tabs" role="tablist" aria-label="Filter appointments">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`filter-tab ${filter === f.id ? 'is-active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-screen" style={{ minHeight: '30vh' }}><div className="spinner" /></div>
      ) : visible.length === 0 ? (
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
          {visible.map((a) => (
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
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => setCancelId(a._id)}>
                    Cancel
                  </button>
                )}
              </div>
              <p className="appointment-reason"><strong>Reason:</strong> {a.reason}</p>
              {a.cancellationReason && (
                <p className="text-muted"><strong>Cancelled:</strong> {a.cancellationReason}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <CancelReasonModal
        open={Boolean(cancelId)}
        title="Cancel appointment"
        confirmLabel="Cancel appointment"
        onClose={() => setCancelId(null)}
        onConfirm={async (cancellationReason) => {
          await updateAppointmentStatus(cancelId, { status: 'cancelled', cancellationReason });
          await load();
        }}
      />
    </AppShell>
  );
}
