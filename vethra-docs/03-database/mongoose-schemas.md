# Canonical Mongoose Schemas (Reference)

AI agents should treat these as the target schemas. Align `backend/models/*` to match; additive fields noted.

## User

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false }, // select:false optional harden
  name: { type: String, required: true, trim: true },
  role: { type: String, enum: ['pet_owner', 'owner', 'vet', 'admin'], default: 'pet_owner' },
}, { timestamps: true });
```

## Clinic

```js
const clinicSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  address: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  operatingHours: { type: String, required: true, trim: true },
  // Phase 2:
  // values: String,
  // services: [String],
  // team: [{ name: String, title: String, photoUrl: String, bio: String }],
  // location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: [Number] },
}, { timestamps: true });
```

## Pet

```js
const petSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true },
  species: { type: String, required: true, trim: true },
  breed: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  weight: { type: Number, required: true, min: 0 },
  sex: { type: String, enum: ['male', 'female', 'unknown'], required: true },
  microchipNumber: { type: String, trim: true, default: '' },
  allergies: { type: String, trim: true, default: '' },
  medicalConditions: { type: String, trim: true, default: '' },
  emergencyContact: { type: String, required: true, trim: true },
  photoUrl: { type: String, default: '' },
}, { timestamps: true });
```

## Appointment (with cancellation audit)

```js
const appointmentSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true, trim: true, maxlength: 500 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
    index: true,
  },
  cancellationReason: { type: String, trim: true, default: '' },
  cancelledBy: { type: String, enum: ['owner', 'clinic', ''], default: '' },
}, { timestamps: true });

appointmentSchema.index({ clinicId: 1, date: 1, time: 1 });
appointmentSchema.index({ ownerId: 1, date: -1 });
appointmentSchema.index({ clinicId: 1, status: 1, date: 1 });
```

## Diagnosis / Prescription / Reminder / TreatmentTask / MedicalDocument

Match field tables in sibling docs under `03-database/`. Keep `timestamps: true` on all.
