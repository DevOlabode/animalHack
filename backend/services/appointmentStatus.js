const ALLOWED = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled'],
  cancelled: [],
  completed: [],
};

/**
 * Assert an appointment status transition is allowed for the given actor.
 * @param {string} current
 * @param {string} next
 * @param {'vet'|'owner'} actorRole
 * @param {string} [reason]
 */
function assertTransition(current, next, actorRole, reason) {
  if (!ALLOWED[current]?.includes(next)) {
    const err = new Error(`Cannot change status from ${current} to ${next}`);
    err.code = 'INVALID_STATUS_TRANSITION';
    err.status = 400;
    throw err;
  }

  if ((next === 'confirmed' || next === 'completed') && actorRole !== 'vet') {
    const err = new Error('Only the clinic can confirm or complete appointments');
    err.code = 'FORBIDDEN_TRANSITION';
    err.status = 403;
    throw err;
  }

  if (next === 'cancelled') {
    const trimmed = reason?.trim?.() ?? '';
    if (trimmed.length < 3 || trimmed.length > 500) {
      const err = new Error('Cancellation reason is required (3–500 characters)');
      err.code = 'VALIDATION_ERROR';
      err.status = 400;
      throw err;
    }
  }
}

module.exports = { ALLOWED, assertTransition };
