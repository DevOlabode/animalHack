const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['owner', 'vet', 'admin'],
    default: 'owner'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toSafeObject = function() {
  const { password, ...safe } = this.toObject();
  return safe;
};

userSchema.statics.findByEmail = async function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.create = async function(data) {
  const existing = await this.findOne({ email: data.email.toLowerCase() });
  if (existing) throw new Error('User already exists');
  return this.create(data);
};

userSchema.statics.verifyPassword = async function(user, password) {
  return user.comparePassword(password);
};

userSchema.statics.toSafeUser = function(user) {
  return user.toSafeObject();
};

module.exports = mongoose.model('User', userSchema);
