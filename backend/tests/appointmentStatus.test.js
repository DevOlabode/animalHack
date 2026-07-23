const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { assertTransition, ALLOWED } = require('../services/appointmentStatus');

describe('appointment status machine', () => {
  it('allows pending → confirmed for vet', () => {
    assert.doesNotThrow(() => assertTransition('pending', 'confirmed', 'vet'));
  });

  it('forbids pending → confirmed for owner', () => {
    assert.throws(
      () => assertTransition('pending', 'confirmed', 'owner'),
      (err) => err.code === 'FORBIDDEN_TRANSITION' && err.status === 403
    );
  });

  it('requires cancellation reason', () => {
    assert.throws(
      () => assertTransition('pending', 'cancelled', 'owner', 'no'),
      (err) => err.code === 'VALIDATION_ERROR'
    );
    assert.doesNotThrow(() => assertTransition('pending', 'cancelled', 'owner', 'Pet feeling better'));
  });

  it('forbids transitions from terminal states', () => {
    assert.deepEqual(ALLOWED.cancelled, []);
    assert.deepEqual(ALLOWED.completed, []);
    assert.throws(
      () => assertTransition('completed', 'cancelled', 'vet', 'Oops'),
      (err) => err.code === 'INVALID_STATUS_TRANSITION'
    );
  });

  it('allows confirmed → completed for vet only', () => {
    assert.doesNotThrow(() => assertTransition('confirmed', 'completed', 'vet'));
    assert.throws(() => assertTransition('confirmed', 'completed', 'owner'));
  });
});
