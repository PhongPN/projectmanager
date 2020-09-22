import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentResponsibility: {
    type: Number,
    required: true,
  },
  departmentTechStackId: [
    {
      type: objectId,
      required: true,
      ref: 'teckstack',
    },
  ],
  departmentProject: [
    {
      projectId: {
        type: objectId,
        required: true,
        ref: 'project',
      },
    },
  ],
  departmentEmployee: [
    {
      employeeId: {
        type: String,
        required: true,
        ref: 'employee',
      },
    },
  ],
}, { collection: 'department' }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

departmentSchema.pre('save', async function save(next) {
  try {
    this.createdAt = Date.now();

    return next();
  } catch (err) {
    return next(err);
  }
});

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