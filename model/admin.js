import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  passWord: {
    type: String,
    require: true,
  },

}, { colection: 'admin' }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

adminSchema.pre('save', async function save(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.passWord = await bcrypt.hash(this.passWord, salt);

    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.statics.verifyPassword = async function (verifyUser) {
  const admin = await this.findOne({ userName: verifyUser.username });
  if (!admin) {
    return { error: true, message: 'Admin not found' };
  } else {
    if (bcrypt.compareSync(verifyUser.password, admin.passWord)) {
      return { error: false, message: 'Login success' };
    } else {
      return { error: true, message: 'Incorrect password' };
    }
  }

};
const Admin = mongoose.model('admin', adminSchema);

export default Admin;