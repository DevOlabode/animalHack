import { Link } from 'react-router-dom';
import PublicShell from '../components/PublicShell';
import PageHeader from '../components/PageHeader';

export default function AboutView() {
  return (
    <PublicShell>
      <div className="container page-enter about-page">
        <PageHeader
          eyebrow="About"
          title="Healthcare that travels with your pet"
          subtitle="Vethra connects pet owners and veterinary clinics through one shared platform."
        />
        <div className="about-grid">
          <div className="card">
            <h2 className="section-title">Our mission</h2>
            <p>
              Vethra replaces scattered paperwork with a centralized medical timeline that both
              owners and authorized veterinarians can access — making every visit smoother and safer.
            </p>
          </div>
          <div className="card">
            <h2 className="section-title">For pet owners</h2>
            <ul className="about-list">
              <li>Manage pet profiles and medical documents</li>
              <li>Book and track appointments online</li>
              <li>View prescriptions and complete care tasks</li>
              <li>Receive medication and follow-up reminders</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="section-title">For clinics</h2>
            <ul className="about-list">
              <li>Review appointment requests and today&apos;s schedule</li>
              <li>Search patients by name or microchip</li>
              <li>Record diagnoses and prescribe medications</li>
              <li>Monitor treatment compliance over time</li>
            </ul>
          </div>
        </div>
        <div className="about-cta">
          <Link to="/signup" className="btn btn-primary">Get started</Link>
          <Link to="/" className="btn btn-secondary">Back to home</Link>
        </div>
      </div>
    </PublicShell>
  );
}
