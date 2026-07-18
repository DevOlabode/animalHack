# Acceptance Tests

## AT-01 Owner signup

Given valid signup form, when submitted, then session exists and role is pet_owner.

## AT-02 Clinic signup

Given clinic signup, then User(vet) + Clinic created and linked.

## AT-03 Add pet

Given owner, when pet created with required fields, then pet listed and age shown.

## AT-04 Book with reason

Given owner with pet and clinic, when booking with reason, then appointment pending and clinic list shows reason.

## AT-05 Confirm

Given vet, when accept, then status confirmed and owner sees update.

## AT-06 Decline with reason

Given vet, when decline with reason, then cancelled and owner notified.

## AT-07 Owner cancel with reason

Given owner, when cancel with reason, then cancelled.

## AT-08 Diagnosis + Rx

Given confirmed/completed visit context, vet adds diagnosis and prescription; owner can view.

## AT-09 Reminder + task

Vet creates reminder; owner updates task status.

## AT-10 Timeline

Pet timeline includes appointment and clinical entries chronologically.

## AT-11 Search

Vet searches by pet name and opens patient.

## AT-12 Forbidden

Owner cannot POST `/api/medical/diagnoses` (403).
