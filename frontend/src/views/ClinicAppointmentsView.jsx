import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { fetchClinicAppointments, updateAppointmentStatus } from '../../services/api';

export default function ClinicAppointmentsView() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const load = () => fetchClinicAppointments().then(setAppointments).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await updateAppointmentStatus(id, status);
    load();
  };

  const pending = appointments.filter((a) => a.status === 'pending');
  const upcoming = appointments.filter((a) => ['confirmed'].includes(a.status));
  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => a.date?.slice?.(0, 10) === today || new Date(a.date).toISOString().slice(0, 10) === today);

  const renderList = (list, actions) => (
    list.length === 0 ? <p className="text-muted">None</p> : list.map((a) => (
      <div key={a._id} className="card" style={{ marginBottom: '1rem' }}>
        <h4>{a.pet?.name} — {a.owner?.name}</h4>
        <p className="text-muted">{new Date(a.date).toLocaleDateString()} at {a.time}</p>
        <p>{a.reason}</p>
        <p><span className="badge">{a.status}</span></p>
        <div className="btn-group">{actions(a)}</div>
      </div>
    ))
  );

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Manage requests and scheduled visits.</p>
        </div>
        <Link to="/patients" className="btn btn-secondary">View patients</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="section-title">Today's appointments ({todayAppts.length})</h2>
          {renderList(todayAppts, (a) => (
            <>
              {a.status === 'confirmed' && <button type="button" className="btn btn-primary" onClick={() => setStatus(a._id, 'completed')}>Mark completed</button>}
              <Link to={`/patients/${a.pet?._id}`} className="btn btn-secondary">View patient</Link>
            </>
          ))}
        </div>
        <div className="card">
          <h2 className="section-title">Pending requests ({pending.length})</h2>
          {renderList(pending, (a) => (
            <>
              <button type="button" className="btn btn-primary" onClick={() => setStatus(a._id, 'confirmed')}>Confirm</button>
              <button type="button" className="btn btn-danger" onClick={() => setStatus(a._id, 'cancelled')}>Reject</button>
            </>
          ))}
        </div>
        <div className="card">
          <h2 className="section-title">Upcoming ({upcoming.length})</h2>
          {renderList(upcoming, (a) => (
            <Link to={`/patients/${a.pet?._id}`} className="btn btn-secondary">View patient</Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
