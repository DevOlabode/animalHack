# Permissions Matrix

| Resource / Action | Guest | Owner | Vet | Admin |
|-------------------|-------|-------|-----|-------|
| View clinics | ✓ | ✓ | ✓ | ✓ |
| Sign up / sign in | ✓ | | | |
| CRUD own pets | | ✓ | | ✓ |
| Book appointment | | ✓ | | |
| Cancel own appointment | | ✓ | | |
| Confirm/decline/complete | | | ✓ | ✓ |
| View clinic calendar | | | ✓ | ✓ |
| Create diagnosis/Rx/reminder | | | ✓ | ✓ |
| View own timeline | | ✓ | | |
| View patient timeline (clinic) | | | ✓ | ✓ |
| Upload own documents | | ✓ | | |
| Search patients | | | ✓ | ✓ |
| Edit clinic profile | | | own | ✓ |
| Social posts / articles | Future | Future | Future | |

## Ownership pseudocode

```js
if (String(pet.ownerId) !== String(req.user._id)) return forbidden();
```
