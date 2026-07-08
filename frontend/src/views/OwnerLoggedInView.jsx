import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import { fetchPets } from '../../services/pets';
import { fetchOwnerAppointments, fetchReminders, fetchTasks, fetchTimeline } from '../../services/api';

const statusClass = { pending: 'badge-pending', confirmed: 'badge-confirmed', cancelled: 'badge-cancelled', completed: 'badge-completed' };

function OwnerLoggedInView() {
  const { user } = useAuth();
  const [petCount, setPetCount] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [recentDiagnoses, setRecentDiagnoses] = useState([]);

  useEffect(() => {
    fetchPets()
      .then((pets) => {
        setPetCount(pets.length);
        return Promise.all([
          fetchOwnerAppointments(),
          fetchReminders(),
          fetchTasks(),
          ...pets.slice(0, 3).map((p) => fetchTimeline(p._id).catch(() => [])),
        ]);
      })
      .then(([appts, rems, tks, ...timelines]) => {
        setAppointments(appts);
        setReminders(rems);
        setTasks(tks);
        const diagnoses = timelines.flat().filter((e) => e.type === 'diagnosis').slice(0, 5);
        setRecentDiagnoses(diagnoses);
      })
      .catch(() => {
        setPetCount(0);
        setAppointments([]);
      });
  }, []);

  const upcoming = appointments.filter((a) => ['pending', 'confirmed'].includes(a.status)).slice(0, 3);
  const activeTasks = tasks.filter((t) => t.status !== 'completed').slice(0, 3);
  const activeReminders = reminders.slice(0, 3);

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Welcome back, {user?.name}</h1>
          <p className="page-subtitle">Manage your pets, appointments, and medical records.</p>
        </div>
        <div className="btn-group">
          <Link to="/clinics" className="btn btn-primary">Book appointment</Link>
          <Link to="/pets/new" className="btn btn-secondary">Add pet</Link>
        </div>
      </div>

      <div className="stat-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="stat-card">
          <div className="stat-label">Pets registered</div>
          <div className="stat-value">{petCount === null ? '…' : petCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Upcoming appointments</div>
          <div className="stat-value">{upcoming.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active care tasks</div>
          <div className="stat-value">{activeTasks.length}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Upcoming appointments</h2>
            <Link to="/appointments" className="nav-link">View all</Link>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-muted">No upcoming appointments. <Link to="/clinics">Browse clinics</Link> to book one.</p>
          ) : upcoming.map((a) => (
            <div key={a._id} className="list-item">
              <div>
                <strong>{a.pet?.name}</strong> — {a.clinic?.name}
                <p className="text-muted">{new Date(a.date).toLocaleDateString()} at {a.time}</p>
              </div>
              <span className={`badge ${statusClass[a.status]}`}>{a.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Active reminders</h2>
            <Link to="/reminders" className="nav-link">View all</Link>
          </div>
          {activeReminders.length === 0 ? (
            <p className="text-muted">No reminders scheduled.</p>
          ) : activeReminders.map((r) => (
            <div key={r._id} className="list-item">
              <div>
                <strong>{r.title}</strong>
                <p className="text-muted">{r.petId?.name} · {new Date(r.dueDate).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Medication schedule</h2>
            <Link to="/reminders" className="nav-link">Track tasks</Link>
          </div>
          {activeTasks.length === 0 ? (
            <p className="text-muted">No care tasks assigned.</p>
          ) : activeTasks.map((t) => (
            <div key={t._id} className="list-item">
              <div>
                <strong>{t.title}</strong>
                <p className="text-muted">{t.petId?.name} · Due {new Date(t.dueDate).toLocaleString()}</p>
              </div>
              <span className="badge">{t.status.replace('_', ' ')}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Recent diagnoses</h2>
            <Link to="/pets" className="nav-link">View pets</Link>
          </div>
          {recentDiagnoses.length === 0 ? (
            <p className="text-muted">No diagnoses recorded yet.</p>
          ) : (
            <div className="timeline">
              {recentDiagnoses.map((entry, i) => (
                <div key={i} className="timeline-item">
                  <strong>{entry.title}</strong>
                  <p className="text-muted">{new Date(entry.date).toLocaleDateString()}</p>
                  {entry.description && <p>{entry.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

export default OwnerLoggedInView;
