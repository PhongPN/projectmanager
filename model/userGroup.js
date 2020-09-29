import mongoose from 'mongoose';

const userGroupSchema = new mongoose.Schema({

  userGroupName: {
    type: String,
    required: true,
  },
  userGroupDesciption: {
    type: String,
  },
  userGroupKeyNumber: {
    type: Number,
    required: true,
  },
  userGroupStatus: {
    type: String,
    required: true,
  },
}, { conllection: 'usergroup' }, { timestamps: { createdAt: Date.now(), updatedAt: 'updatedAt' } });

userGroupSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const UserGroup = mongoose.model('UserGroup', userGroupSchema);

export default UserGroup;