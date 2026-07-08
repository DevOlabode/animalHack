import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function AboutView() {
  return (
    <AuthLayout
      wide
      title="About PetCare"
      subtitle="A digital healthcare platform connecting pet owners and veterinary clinics."
    >
      <div className="form-grid">
        <p>
          PetCare lets pet owners and veterinary clinics manage the full visit workflow — from booking
          appointments to recording diagnoses, prescribing medications, and tracking treatment compliance.
        </p>
        <p>
          Our goal is to replace scattered paperwork with a centralized medical timeline that both
          owners and authorized veterinarians can access.
        </p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </AuthLayout>
  );
}
