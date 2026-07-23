import { BrowserRouter, Routes, Route } from 'react-router-dom';

import OwnerLoggedInView from './views/OwnerLoggedInView';
import ClinicLoggedInView from './views/ClinicLoggedInView';
import NotLoggedInHome from './views/NotLoggedInHome';
import SignInView from './views/SignInView';
import SignUpView from './views/SignUpView';
import ClinicSignUpView from './views/ClinicSignUpView';
import ForgotPasswordView from './views/ForgotPasswordView';
import ResetPasswordView from './views/ResetPasswordView';
import ProfileView from './views/ProfileView';
import PetsListView from './views/PetsListView';
import PetDetailView from './views/PetDetailView';
import PetFormView from './views/PetFormView';
import ClinicsListView from './views/ClinicsListView';
import ClinicDetailView from './views/ClinicDetailView';
import OwnerAppointmentsView from './views/OwnerAppointmentsView';
import ClinicAppointmentsView from './views/ClinicAppointmentsView';
import ClinicPatientsView from './views/ClinicPatientsView';
import PatientDetailView from './views/PatientDetailView';
import RemindersView from './views/RemindersView';
import AboutView from './views/AboutView';
import NotFoundView from './views/NotFoundView';
import RequireAuth from './components/RequireAuth';
import RequirePetOwner from './components/RequirePetOwner';
import RequireVet from './components/RequireVet';
import { AuthProvider, useAuth } from './context/AuthContext';

function HomeRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" aria-label="Loading" /></div>;
  if (!user) return <NotLoggedInHome />;
  if (user.role === 'vet') return <ClinicLoggedInView />;
  return <OwnerLoggedInView />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/signin" element={<SignInView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route path="/signup/clinic" element={<ClinicSignUpView />} />
          <Route path="/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/reset-password" element={<ResetPasswordView />} />
          <Route path="/clinics" element={<ClinicsListView />} />
          <Route path="/clinics/:id" element={<ClinicDetailView />} />
          <Route path="/profile" element={<RequireAuth><ProfileView /></RequireAuth>} />
          <Route path="/appointments" element={<RequirePetOwner><OwnerAppointmentsView /></RequirePetOwner>} />
          <Route path="/reminders" element={<RequirePetOwner><RemindersView /></RequirePetOwner>} />
          <Route path="/pets" element={<RequirePetOwner><PetsListView /></RequirePetOwner>} />
          <Route path="/pets/new" element={<RequirePetOwner><PetFormView /></RequirePetOwner>} />
          <Route path="/pets/:id" element={<RequirePetOwner><PetDetailView /></RequirePetOwner>} />
          <Route path="/pets/:id/edit" element={<RequirePetOwner><PetFormView /></RequirePetOwner>} />
          <Route path="/clinic/appointments" element={<RequireVet><ClinicAppointmentsView /></RequireVet>} />
          <Route path="/patients" element={<RequireVet><ClinicPatientsView /></RequireVet>} />
          <Route path="/patients/:id" element={<RequireVet><PatientDetailView /></RequireVet>} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
