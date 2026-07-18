# Component Guide

## Rules

1. Presentational components receive data + callbacks via props
2. Route-level `*View.jsx` owns fetching
3. Guards wrap pages, not individual buttons only
4. Reuse `EmptyState`, `PageHeader`, `StatusBadge`

## AppointmentCard (canonical)

**Props:** `appointment`, `pet`, `owner?`, `clinic?`, `variant: 'owner'|'clinic'`, handlers

**Must show:** date/time, status badge, pet name, **reason** (clinic variant), actions by status/role

**A11y:** actions focusable; status text present

## ConfirmReasonModal

**Props:** `title`, `confirmLabel`, `onConfirm(reason)`, `onClose`, `minLength=3`

Used for cancel + decline.
