import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell';
import PageHeader from '../components/PageHeader';
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
      <PageHeader
        eyebrow="Care plan"
        title="Reminders & care tasks"
        subtitle="Track medications, follow-ups, and daily care for your pets."
      />
      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Care tasks</h2>
          </div>
          {tasks.length === 0 ? (
            <p className="text-muted">No tasks assigned yet.</p>
          ) : tasks.map((t) => (
            <div key={t._id} className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <strong>{t.title}</strong>
                  <p className="text-muted">{t.petId?.name} · Due {new Date(t.dueDate).toLocaleString()}</p>
                  {t.description && <p>{t.description}</p>}
                </div>
                <span className="badge">{t.status.replace('_', ' ')}</span>
              </div>
              <div className="btn-group" style={{ marginTop: '0.75rem' }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => setStatus(t._id, 'completed')}>Completed</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStatus(t._id, 'in_progress')}>In progress</button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => setStatus(t._id, 'missed')}>Missed</button>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-header">
            <h2 className="section-title">Scheduled reminders</h2>
          </div>
          {reminders.length === 0 ? (
            <p className="text-muted">No reminders scheduled.</p>
          ) : reminders.map((r) => (
            <div key={r._id} className="list-item">
              <div>
                <strong>{r.title}</strong>
                <p className="text-muted">{r.petId?.name} · {new Date(r.dueDate).toLocaleString()}</p>
                {r.message && <p>{r.message}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
