# Scalability

## MVP assumptions

- Single Express instance
- MongoDB Atlas free/shared tier
- < 100 demo users

## Growth path (do not build yet)

1. Indexes on foreign keys and search fields (do now — cheap)
2. Background job for reminder emails (cron / queue)
3. CDN for uploads
4. Read replicas / horizontal API later
5. Separate notification worker

## What not to premature-optimize

Microservices, GraphQL, event sourcing, Kubernetes.
