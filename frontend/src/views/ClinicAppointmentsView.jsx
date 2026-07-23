import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import CancelReasonModal from '../components/CancelReasonModal';
import { IconCalendar } from '../components/icons';
import { fetchClinicAppointments, updateAppointmentStatus } from '../../services/api';

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

export default function ClinicAppointmentsView() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [declineId, setDeclineId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchClinicAppointments();
      setAppointments(data);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, payload) => {
    setBusyId(id);
    setActionError('');
    try {
      await updateAppointmentStatus(id, payload);
      await load();
    } catch (e) {
      setActionError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => {
    const d = a.date?.slice?.(0, 10) || new Date(a.date).toISOString().slice(0, 10);
    return d === today && (a.status === 'pending' || a.status === 'confirmed');
  });

  const visible = filter === 'all'
    ? appointments
    : appointments.filter((a) => a.status === filter);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Clinic schedule"
        title="Appointments"
        subtitle="Review requests, accept visits, and track status."
        actions={<Link to="/patients" className="btn btn-secondary">View patients</Link>}
      />

      {error && <div className="alert alert-error">{error}</div>}
      {actionError && <div className="alert alert-error">{actionError}</div>}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="section-title">Today ({todayAppts.length})</h2>
        {todayAppts.length === 0 ? (
          <p className="text-muted">No visits scheduled for today.</p>
        ) : (
          todayAppts.map((a) => (
            <div key={a._id} className="appointment-row">
              <div>
                <strong>{a.pet?.name}</strong> — {a.owner?.name}
                <div className="text-muted">{a.time} · <span className={`badge ${statusClass[a.status]}`}>{a.status}</span></div>
                <p className="appointment-reason">{a.reason}</p>
              </div>
              <div className="btn-group">
                {a.status === 'confirmed' && (
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={busyId === a._id}
                    onClick={() => setStatus(a._id, { status: 'completed' })}
                  >
                    Complete
                  </button>
                )}
                <Link to={`/patients/${a.pet?._id || a.petId}`} className="btn btn-secondary btn-sm">Patient</Link>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="filter-tabs" role="tablist" aria-label="Filter by status">
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
            {f.id !== 'all' && (
              <span className="filter-count">
                {appointments.filter((a) => a.status === f.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-screen" style={{ minHeight: '30vh' }}><div className="spinner" /></div>
      ) : visible.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={IconCalendar}
            title="No appointments in this view"
            description="New booking requests will appear in Pending."
          />
        </div>
      ) : (
        <div className="dashboard-grid">
          {visible.map((a) => (
            <div key={a._id} className="card appointment-card">
              <div className="appointment-card-header">
                <div>
                  <h3>{a.pet?.name} — {a.owner?.name}</h3>
                  <div className="appointment-card-meta">
                    <span className="appointment-date">
                      {new Date(a.date).toLocaleDateString()} at {a.time}
                    </span>
                    <span className={`badge ${statusClass[a.status]}`}>{a.status}</span>
                  </div>
                </div>
              </div>
              <p className="appointment-reason"><strong>Reason:</strong> {a.reason}</p>
              {a.pet?.allergies && (
                <p className="text-muted"><strong>Allergies:</strong> {a.pet.allergies}</p>
              )}
              {a.cancellationReason && (
                <p className="text-muted"><strong>Cancel reason:</strong> {a.cancellationReason}</p>
              )}
              <div className="btn-group" style={{ marginTop: '0.75rem' }}>
                {a.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={busyId === a._id}
                      onClick={() => setStatus(a._id, { status: 'confirmed' })}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      disabled={busyId === a._id}
                      onClick={() => setDeclineId(a._id)}
                    >
                      Decline
                    </button>
                  </>
                )}
                {a.status === 'confirmed' && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={busyId === a._id}
                    onClick={() => setStatus(a._id, { status: 'completed' })}
                  >
                    Mark completed
                  </button>
                )}
                <Link to={`/patients/${a.pet?._id || a.petId}`} className="btn btn-secondary">
                  View patient
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <CancelReasonModal
        open={Boolean(declineId)}
        title="Decline appointment"
        confirmLabel="Decline request"
        onClose={() => setDeclineId(null)}
        onConfirm={async (cancellationReason) => {
          await updateAppointmentStatus(declineId, { status: 'cancelled', cancellationReason });
          await load();
        }}
      />
    </AppShell>
  );
}
