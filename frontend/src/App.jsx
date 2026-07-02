import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OwnerLoggedInView from './views/OwnerLoggedInView';
import NotLoggedInHome from './views/NotLoggedInHome';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import { AuthProvider, useAuth } from './context/AuthContext';

function HomeRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return user ? <OwnerLoggedInView /> : <NotLoggedInHome />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/signin" element={<SignInView />} />
          <Route path="/signup" element={<SignUpView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
