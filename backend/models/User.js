const bcrypt = require('bcryptjs');

const users = new Map();

class User {
  static async create({ email, password, name, role = 'pet_owner' }) {
    const existingUser = users.get(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date().toISOString()
    };
    users.set(email, user);
    return user;
  }

  static async findByEmail(email) {
    return users.get(email) || null;
  }

  static async findById(id) {
    for (const user of users.values()) {
      if (user.id === id) return user;
    }
    return null;
  }

  static async verifyPassword(user, password) {
    return bcrypt.compare(password, user.password);
  }

  static toSafeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}

module.exports = User;
