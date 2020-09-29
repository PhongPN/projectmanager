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

}, { collection: 'admin' }, { timestamps: { createdAt: Date.now() } });

adminSchema.pre('save', async function save(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.passWord = await bcrypt.hash(this.passWord, salt);

    return next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.statics.verifyPassword = async function (verifyUser, admin) {
  if (bcrypt.compareSync(verifyUser.password, admin.passWord)) {
    return true;
  }

  return false;
};
const Admin = mongoose.model('admin', adminSchema);

export default Admin;