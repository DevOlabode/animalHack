# Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| VALIDATION_ERROR | 400 | Joi/input failed |
| INVALID_CREDENTIALS | 401 | Bad login |
| UNAUTHENTICATED | 401 | No session |
| FORBIDDEN | 403 | Role/ownership |
| NOT_FOUND | 404 | Generic |
| PET_NOT_FOUND | 404 | |
| CLINIC_NOT_FOUND | 404 | |
| APPOINTMENT_NOT_FOUND | 404 | |
| EMAIL_TAKEN | 409 | Signup conflict |
| APPOINTMENT_CONFLICT | 409 | Slot taken |
| INVALID_STATUS_TRANSITION | 400 | Illegal status change |
| PET_HAS_APPOINTMENTS | 400 | Delete blocked |
| RESET_TOKEN_INVALID | 400 | Password reset |
| UPLOAD_TOO_LARGE | 413 | |
| UNSUPPORTED_FILE_TYPE | 400 | |
| INTERNAL_ERROR | 500 | Unexpected |
