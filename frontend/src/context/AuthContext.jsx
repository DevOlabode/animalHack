import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(({ user: currentUser, clinic: currentClinic }) => {
        setUser(currentUser);
        setClinic(currentClinic);
      })
      .catch(() => {
        setUser(null);
        setClinic(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const setAuth = ({ user: nextUser, clinic: nextClinic = null }) => {
    setUser(nextUser);
    setClinic(nextClinic);
  };

  const clearAuth = () => {
    setUser(null);
    setClinic(null);
  };

  return (
    <AuthContext.Provider value={{ user, clinic, setAuth, clearAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
