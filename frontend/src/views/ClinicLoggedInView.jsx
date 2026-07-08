import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { IconCalendar, IconClipboard, IconUsers } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { fetchClinicAppointments, fetchPatients } from '../../services/api';

function ClinicLoggedInView() {
  const { clinic } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    Promise.all([fetchClinicAppointments(), fetchPatients()])
      .then(([appts, pts]) => {
        setAppointments(appts);
        setPatients(pts);
      })
      .catch(() => {});
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayAppts = appointments.filter((a) => {
    const d = a.date?.slice?.(0, 10) ?? new Date(a.date).toISOString().slice(0, 10);
    return d === today && ['confirmed', 'pending'].includes(a.status);
  });
  const pending = appointments.filter((a) => a.status === 'pending');
  const upcoming = appointments.filter((a) => a.status === 'confirmed').slice(0, 5);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Clinic dashboard"
        title={clinic?.name ?? 'Clinic Dashboard'}
        subtitle="Today's schedule, pending requests, and recent patients."
        actions={(
          <>
            <Link to="/clinic/appointments" className="btn btn-primary">Manage appointments</Link>
            <Link to="/profile" className="btn btn-secondary">Edit profile</Link>
          </>
        )}
      />

      <div className="stat-grid" style={{ marginBottom: '1.75rem' }}>
        <StatCard icon={IconCalendar} label="Today's appointments" value={todayAppts.length} accent="teal" />
        <StatCard icon={IconClipboard} label="Pending requests" value={pending.length} accent="amber" />
        <StatCard icon={IconUsers} label="Recent patients" value={patients.length} accent="indigo" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Today&apos;s appointments</h2>
            <Link to="/clinic/appointments" className="nav-link">View all</Link>
          </div>
          {todayAppts.length === 0 ? (
            <p className="text-muted">No appointments scheduled for today.</p>
          ) : todayAppts.map((a) => (
            <div key={a._id} className="list-item">
              <div>
                <strong>{a.pet?.name}</strong> — {a.owner?.name}
                <p className="text-muted">{a.time} · {a.reason}</p>
              </div>
              <Link to={`/patients/${a.pet?._id}`} className="btn btn-secondary btn-sm">View</Link>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Appointment requests</h2>
            <Link to="/clinic/appointments" className="nav-link">Review</Link>
          </div>
          {pending.length === 0 ? (
            <p className="text-muted">No pending requests.</p>
          ) : pending.slice(0, 5).map((a) => (
            <div key={a._id} className="list-item">
              <div>
                <strong>{a.pet?.name}</strong> — {a.owner?.name}
                <p className="text-muted">{new Date(a.date).toLocaleDateString()} at {a.time}</p>
              </div>
              <span className="badge badge-pending">pending</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Upcoming appointments</h2>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-muted">No confirmed upcoming visits.</p>
          ) : upcoming.map((a) => (
            <div key={a._id} className="list-item">
              <div>
                <strong>{a.pet?.name}</strong>
                <p className="text-muted">{new Date(a.date).toLocaleDateString()} at {a.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Recent patients</h2>
            <Link to="/patients" className="nav-link">Search patients</Link>
          </div>
          {patients.length === 0 ? (
            <p className="text-muted">No patients yet.</p>
          ) : patients.slice(0, 5).map(({ pet, owner }) => (
            <div key={pet._id} className="list-item">
              <div>
                <strong>{pet.name}</strong>
                <p className="text-muted">{pet.species} · Owner: {owner?.name}</p>
              </div>
              <Link to={`/patients/${pet._id}`} className="btn btn-secondary btn-sm">Open</Link>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

export default ClinicLoggedInView;
