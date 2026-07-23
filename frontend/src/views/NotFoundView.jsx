import { Link } from 'react-router-dom';
import PublicShell from '../components/PublicShell';
import EmptyState from '../components/EmptyState';
import { IconClipboard } from '../components/icons';

export default function NotFoundView() {
  return (
    <PublicShell>
      <div className="container page-enter" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="card card-xl">
          <EmptyState
            icon={IconClipboard}
            title="Page not found"
            description="That route doesn’t exist. Head home or browse clinics to continue."
            action={(
              <div className="btn-group">
                <Link to="/" className="btn btn-primary">Go home</Link>
                <Link to="/clinics" className="btn btn-secondary">Browse clinics</Link>
              </div>
            )}
          />
          <p className="text-muted" style={{ textAlign: 'center', marginTop: '0.5rem' }}>Error 404</p>
        </div>
      </div>
    </PublicShell>
  );
}
