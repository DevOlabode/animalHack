import { useEffect, useId, useState } from 'react';

export default function CancelReasonModal({
  open,
  title = 'Cancel appointment',
  confirmLabel = 'Confirm cancellation',
  onClose,
  onConfirm,
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const titleId = useId();
  const inputId = useId();

  useEffect(() => {
    if (!open) {
      setReason('');
      setError('');
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = reason.trim();
    if (trimmed.length < 3) {
      setError('Please provide a reason (at least 3 characters).');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onConfirm(trimmed);
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="section-title">{title}</h2>
        <p className="text-muted">A short reason helps the other party understand what changed.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={inputId}>Reason</label>
            <textarea
              id={inputId}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              maxLength={500}
              required
              autoFocus
              placeholder="e.g. Pet symptoms improved / schedule conflict"
            />
          </div>
          <div className="btn-group" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Keep appointment
            </button>
            <button type="submit" className="btn btn-danger" disabled={submitting}>
              {submitting ? 'Saving…' : confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
