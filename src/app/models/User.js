import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // sequelize argument === database connection
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Hook responsable for hashing the password
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Checking password
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;