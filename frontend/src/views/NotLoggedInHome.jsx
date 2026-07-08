import { Link } from 'react-router-dom';
import PublicShell from '../components/PublicShell';
import { IconCalendar, IconClipboard, IconHeart, IconPaw, IconUsers } from '../components/icons';

const features = [
  {
    Icon: IconPaw,
    title: 'Pet profiles',
    description: 'Centralized records for every pet — allergies, conditions, photos, and emergency contacts.',
  },
  {
    Icon: IconCalendar,
    title: 'Appointments',
    description: 'Browse clinics, pick a time slot, and manage the full visit lifecycle digitally.',
  },
  {
    Icon: IconClipboard,
    title: 'Medical timeline',
    description: 'Diagnoses, prescriptions, and visit history in one chronological view.',
  },
  {
    Icon: IconHeart,
    title: 'Treatment tracking',
    description: 'Medication reminders and care tasks so owners stay on top of treatment plans.',
  },
];

const steps = [
  'Owner adds a pet profile',
  'Books an appointment at a clinic',
  'Clinic confirms the visit',
  'Vet records diagnosis & prescriptions',
  'Owner completes care tasks at home',
];

export default function NotLoggedInHome() {
  return (
    <PublicShell>
      <section className="landing-hero">
        <div className="container landing-hero-grid">
          <div className="landing-hero-copy">
            <div className="brand-badge">
              <span className="brand-mark">P</span>
              PetCare Platform
            </div>
            <h1 className="landing-title">Digital healthcare for every pet</h1>
            <p className="landing-lead">
              One platform where pet owners and veterinary clinics manage the entire visit —
              from booking to treatment — without paperwork.
            </p>
            <div className="hero-actions hero-actions-left">
              <Link to="/signup" className="btn btn-primary">Get started free</Link>
              <Link to="/clinics" className="btn btn-secondary">Browse clinics</Link>
            </div>
            <p className="landing-note">
              Already have an account? <Link to="/signin">Sign in</Link>
              {' · '}
              <Link to="/signup/clinic">Register your clinic</Link>
            </p>
          </div>
          <div className="landing-hero-visual" aria-hidden>
            <div className="hero-card hero-card-main">
              <div className="hero-card-label">Upcoming visit</div>
              <strong>Buddy · Wellness check</strong>
              <p>Happy Paws Veterinary Clinic</p>
              <span className="badge badge-confirmed">Confirmed</span>
            </div>
            <div className="hero-card hero-card-secondary">
              <div className="hero-card-label">Care task</div>
              <strong>Morning medication</strong>
              <p>Max · Apoquel 16mg</p>
            </div>
            <div className="hero-card hero-card-accent">
              <IconUsers />
              <span>Owners & clinics, connected</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="container">
          <div className="section-intro">
          <p className="page-eyebrow">Features</p>
          <h2 className="section-heading">Everything you need for modern pet care</h2>
          <p className="text-muted">Built for the full workflow between owners and veterinary clinics.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ Icon, title, description }) => (
            <article key={title} className="feature-card">
              <div className="feature-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="landing-section landing-section-muted">
        <div className="container">
          <div className="section-intro">
          <p className="page-eyebrow">How it works</p>
          <h2 className="section-heading">From booking to follow-up in five steps</h2>
        </div>
        <ol className="workflow-steps">
          {steps.map((step, i) => (
            <li key={step}>
              <span className="workflow-step-num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        </div>
      </section>

      <section className="landing-cta">
        <div className="container">
          <div className="landing-cta-inner">
          <h2>Ready to simplify pet healthcare?</h2>
          <p className="text-muted">Join as a pet owner or register your clinic today.</p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary">Pet owner sign up</Link>
            <Link to="/signup/clinic" className="btn btn-secondary">Clinic sign up</Link>
          </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
