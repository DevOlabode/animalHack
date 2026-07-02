import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequirePetOwner({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role === 'vet') {
    return <Navigate to="/" replace />;
  }

  return children;
}
