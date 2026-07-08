require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Clinic = require('../models/Clinic');
const Pet = require('../models/Pet');
const Appointment = require('../models/Appointment');
const Diagnosis = require('../models/Diagnosis');
const Prescription = require('../models/Prescription');
const Reminder = require('../models/Reminder');
const TreatmentTask = require('../models/TreatmentTask');

const DEMO_PASSWORD = 'demo123456';

const seed = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log('[SEED] Connected to MongoDB');

  const owner = await upsertUser({
    email: 'demo@petowner.com',
    name: 'Demo Pet Owner',
    role: 'pet_owner',
  });

  const vet1 = await upsertUser({
    email: 'demo@happypaws.com',
    name: 'Dr. Sarah Chen',
    role: 'vet',
  });

  const vet2 = await upsertUser({
    email: 'demo@westsidevet.com',
    name: 'Dr. James Okonkwo',
    role: 'vet',
  });

  const clinic1 = await upsertClinic(vet1._id, {
    name: 'Happy Paws Veterinary Clinic',
    description: 'Full-service veterinary care for dogs and cats. Wellness exams, surgery, and emergency care.',
    address: '123 Main Street, Calgary, AB',
    phone: '403-555-0100',
    email: 'info@happypaws.demo',
    operatingHours: 'Mon–Fri 8:00 AM – 6:00 PM, Sat 9:00 AM – 2:00 PM',
  });

  const clinic2 = await upsertClinic(vet2._id, {
    name: 'Westside Animal Hospital',
    description: 'Modern animal hospital specializing in diagnostics, dental care, and chronic disease management.',
    address: '456 Oak Avenue, Calgary, AB',
    phone: '403-555-0200',
    email: 'contact@westsidevet.demo',
    operatingHours: 'Mon–Sat 7:30 AM – 7:00 PM',
  });

  await Pet.deleteMany({ ownerId: owner._id });

  const buddy = await Pet.create({
    ownerId: owner._id,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    dateOfBirth: new Date('2020-03-15'),
    weight: 32,
    sex: 'male',
    microchipNumber: 'CHIP-001-BUDDY',
    allergies: 'Chicken',
    medicalConditions: 'Mild hip dysplasia',
    emergencyContact: 'Demo Pet Owner — 403-555-9999',
  });

  const luna = await Pet.create({
    ownerId: owner._id,
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    dateOfBirth: new Date('2022-08-10'),
    weight: 4.5,
    sex: 'female',
    microchipNumber: 'CHIP-002-LUNA',
    allergies: 'None',
    medicalConditions: '',
    emergencyContact: 'Demo Pet Owner — 403-555-9999',
  });

  const max = await Pet.create({
    ownerId: owner._id,
    name: 'Max',
    species: 'Dog',
    breed: 'Beagle',
    dateOfBirth: new Date('2019-11-22'),
    weight: 12,
    sex: 'male',
    microchipNumber: 'CHIP-003-MAX',
    allergies: 'Beef',
    medicalConditions: 'Seasonal allergies',
    emergencyContact: 'Demo Pet Owner — 403-555-9999',
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(12, 0, 0, 0);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  nextWeek.setHours(12, 0, 0, 0);

  await Appointment.deleteMany({ ownerId: owner._id });

  const confirmedAppt = await Appointment.create({
    petId: buddy._id,
    ownerId: owner._id,
    clinicId: clinic1._id,
    vetId: vet1._id,
    date: tomorrow,
    time: '10:00',
    reason: 'Annual wellness check',
    status: 'confirmed',
  });

  await Appointment.create({
    petId: luna._id,
    ownerId: owner._id,
    clinicId: clinic1._id,
    vetId: vet1._id,
    date: nextWeek,
    time: '14:00',
    reason: 'Vaccination booster',
    status: 'pending',
  });

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 14);
  pastDate.setHours(12, 0, 0, 0);

  const completedAppt = await Appointment.create({
    petId: max._id,
    ownerId: owner._id,
    clinicId: clinic2._id,
    vetId: vet2._id,
    date: pastDate,
    time: '11:00',
    reason: 'Skin irritation follow-up',
    status: 'completed',
  });

  await Diagnosis.deleteMany({ petId: { $in: [buddy._id, luna._id, max._id] } });
  await Prescription.deleteMany({ petId: { $in: [buddy._id, luna._id, max._id] } });
  await Reminder.deleteMany({ ownerId: owner._id });
  await TreatmentTask.deleteMany({ ownerId: owner._id });

  const diagnosis = await Diagnosis.create({
    petId: max._id,
    appointmentId: completedAppt._id,
    clinicId: clinic2._id,
    vetId: vet2._id,
    diagnosis: 'Atopic dermatitis (seasonal)',
    clinicalNotes: 'Mild erythema on inner thighs. No infection observed.',
    treatmentPlan: 'Topical treatment and dietary adjustment. Recheck in 4 weeks.',
  });

  const prescription = await Prescription.create({
    petId: max._id,
    appointmentId: completedAppt._id,
    diagnosisId: diagnosis._id,
    clinicId: clinic2._id,
    vetId: vet2._id,
    medicationName: 'Apoquel',
    dosage: '16mg',
    frequency: 'Once daily',
    duration: '30 days',
    instructions: 'Give with food in the morning.',
    isActive: true,
  });

  const reminder = await Reminder.create({
    petId: max._id,
    ownerId: owner._id,
    clinicId: clinic2._id,
    vetId: vet2._id,
    type: 'medication',
    title: 'Morning medication — Max',
    message: 'Give Apoquel 16mg with breakfast',
    dueDate: tomorrow,
    prescriptionId: prescription._id,
    emailSent: false,
  });

  await TreatmentTask.create({
    petId: max._id,
    ownerId: owner._id,
    reminderId: reminder._id,
    prescriptionId: prescription._id,
    title: 'Morning medication',
    description: 'Give Apoquel 16mg with breakfast',
    dueDate: tomorrow,
    status: 'in_progress',
  });

  await Reminder.create({
    petId: buddy._id,
    ownerId: owner._id,
    clinicId: clinic1._id,
    vetId: vet1._id,
    type: 'follow_up',
    title: 'Post-exam follow-up — Buddy',
    message: 'Review wellness check results',
    dueDate: nextWeek,
    appointmentId: confirmedAppt._id,
    emailSent: false,
  });

  console.log('\n[SEED] Complete!\n');
  console.log('Demo accounts (password for all: demo123456):');
  console.log('  Pet owner : demo@petowner.com');
  console.log('  Clinic 1  : demo@happypaws.com  (Happy Paws Veterinary Clinic)');
  console.log('  Clinic 2  : demo@westsidevet.com (Westside Animal Hospital)');
  console.log('\nPets created: Buddy, Luna, Max');
  console.log('Appointments: 1 confirmed, 1 pending, 1 completed');
  console.log('Medical records: diagnosis + prescription + reminders for Max\n');

  await mongoose.disconnect();
};

async function upsertUser({ email, name, role }) {
  let user = await User.findByEmail(email);
  if (user) {
    console.log(`[SEED] User exists: ${email}`);
    return user;
  }
  user = await User.create({ email, password: DEMO_PASSWORD, name, role });
  console.log(`[SEED] Created user: ${email}`);
  return user;
}

async function upsertClinic(userId, data) {
  let clinic = await Clinic.findOne({ userId });
  if (clinic) {
    Object.assign(clinic, data);
    await clinic.save();
    console.log(`[SEED] Updated clinic: ${data.name}`);
    return clinic;
  }
  clinic = await Clinic.createForUser(userId, data);
  console.log(`[SEED] Created clinic: ${data.name}`);
  return clinic;
}

seed().catch((err) => {
  console.error('[SEED] Error:', err);
  process.exit(1);
});
