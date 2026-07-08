import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell';
import { fetchReminders, fetchTasks, updateTaskStatus } from '../../services/api';

export default function RemindersView() {
  const [reminders, setReminders] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const load = () => {
    Promise.all([fetchReminders(), fetchTasks()])
      .then(([r, t]) => { setReminders(r); setTasks(t); })
      .catch((e) => setError(e.message));
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await updateTaskStatus(id, status);
    load();
  };

  return (
    <AppShell>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Reminders & care tasks</h1>
          <p className="page-subtitle">Track medications and follow-up care for your pets.</p>
        </div>
      </div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-grid">
        <div className="card">
          <h2 className="section-title">Care tasks</h2>
          {tasks.length === 0 ? <p className="text-muted">No tasks assigned.</p> : tasks.map((t) => (
            <div key={t._id} className="card" style={{ marginBottom: '1rem', padding: '1rem' }}>
              <h4>{t.title} — {t.petId?.name}</h4>
              <p className="text-muted">Due: {new Date(t.dueDate).toLocaleString()}</p>
              <p>{t.description}</p>
              <span className="badge">{t.status.replace('_', ' ')}</span>
              <div className="btn-group" style={{ marginTop: '0.75rem' }}>
                <button type="button" className="btn btn-primary" onClick={() => setStatus(t._id, 'completed')}>Completed</button>
                <button type="button" className="btn btn-secondary" onClick={() => setStatus(t._id, 'in_progress')}>In progress</button>
                <button type="button" className="btn btn-danger" onClick={() => setStatus(t._id, 'missed')}>Missed</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <h2 className="section-title">Scheduled reminders</h2>
          {reminders.length === 0 ? <p className="text-muted">No reminders.</p> : reminders.map((r) => (
            <div key={r._id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
              <strong>{r.title}</strong>
              <p className="text-muted">{r.petId?.name} · {new Date(r.dueDate).toLocaleString()}</p>
              <p>{r.message}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
