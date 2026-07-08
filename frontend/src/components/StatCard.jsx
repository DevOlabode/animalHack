export default function StatCard({ icon: Icon, label, value, accent = 'teal' }) {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      {Icon && (
        <div className="stat-icon" aria-hidden>
          <Icon />
        </div>
      )}
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}
