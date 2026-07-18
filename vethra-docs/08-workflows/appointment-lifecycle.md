# Workflow: Appointment Lifecycle

## Confirm

Clinic opens pending → Accept → `confirmed` → email owner

## Decline

Clinic Decline → modal reason → `cancelled` + `cancelledBy=clinic` → email owner

## Owner cancel

Owner Cancel → modal reason → `cancelled` + `cancelledBy=owner` → email clinic

## Complete

Clinic marks `completed` after visit → unlocks natural path to diagnosis/Rx

## Calendar mental model

Tabs or filters:

1. Waiting approval (`pending`)
2. Approved (`confirmed`)
3. Declined/Cancelled (`cancelled`)
4. Completed (`completed`)
