import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it's modified
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

// Function to find a user by email
userSchema.statics.findUserByEmail = async function (email) {
  return this.findOne({ email });
};

// Function to create a new user
userSchema.statics.createUser = async function (username, email, password) {
  const existingUser = await this.findUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  return this.create({
    username,
    email,
    password,
  });
};

const User = mongoose.model('User', userSchema);

export default User;
