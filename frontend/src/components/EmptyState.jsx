export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon />
        </div>
      )}
      <h2>{title}</h2>
      {description && <p className="text-muted">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
