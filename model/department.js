import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentResponsibility: {
    type: String,
    required: true,
  },
  departmentTechStack: [
    {
      type: objectId,
      required: true,
      ref: 'teckstack',
    },
  ],
  departmentProject: [
    {
      type: objectId,
      ref: 'project',
    },
  ],
  departmentEmployee: [
    {
      type: objectId,
      ref: 'employee',
    },
  ],
}, { collection: 'department' }, { timestamps: { createdAt: Date.now(), updatedAt: 'updateAt' } });

departmentSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const Department = mongoose.model('department', departmentSchema);

export default Department;