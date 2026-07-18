# Appointment Status Machine (Backend Contract)

## States

`pending` | `confirmed` | `cancelled` | `completed`

## Transition table

| From | To | Actor | Requires reason | Side effects |
|------|----|-------|-----------------|--------------|
| pending | confirmed | vet (same clinic) | no | email owner |
| pending | cancelled | vet | yes | `cancelledBy=clinic`; email owner |
| pending | cancelled | owner | yes | `cancelledBy=owner`; email clinic |
| confirmed | completed | vet | no | none required |
| confirmed | cancelled | vet | yes | clinic cancel email owner |
| confirmed | cancelled | owner | yes | owner cancel email clinic |
| completed | * | — | — | **forbidden** |
| cancelled | * | — | — | **forbidden** |

## Pseudocode

```js
const ALLOWED = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'cancelled'],
  cancelled: [],
  completed: [],
};

function assertTransition(current, next, actor) {
  if (!ALLOWED[current]?.includes(next)) {
    const err = new Error('Invalid status transition');
    err.code = 'INVALID_STATUS_TRANSITION';
    err.status = 400;
    throw err;
  }
  if (next === 'confirmed' || next === 'completed') {
    if (actor.role !== 'vet') throw forbidden();
  }
  if (next === 'cancelled' && !reason) throw validation();
}
```

## Double booking

Before create:

```js
const clash = await Appointment.findOne({
  clinicId,
  date: dayStart,
  time,
  status: { $in: ['pending', 'confirmed'] },
});
if (clash) conflict();
```
