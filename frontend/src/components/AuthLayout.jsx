import BrandLogo from './BrandLogo';

export default function AuthLayout({ title, subtitle, wide = false, children }) {
  return (
    <div className="page-center auth-page">
      <div className={`auth-card${wide ? ' auth-card-wide' : ''}`}>
        <div className="brand-badge">
          <BrandLogo />
        </div>
        <h1 className="page-title auth-title">{title}</h1>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
