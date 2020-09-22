import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectKindId: {
    type: objectId,
    required: true,
    ref: 'projectkind',
  },
  projectStatusId: {
    type: objectId,
    required: true,
    ref: 'projectstatus',
  },
  projectTeckStack: [
    {
      techStackId: {
        type: objectId,
        required: true,
        ref: 'teckstack',
      },
    },
  ],
  projectEmployee: [
    {
      employeeId: {
        type: objectId,
        required: true,
        ref: 'employee',
      },
    },
  ],
}, { collection: 'project' }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

projectSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const Project = mongoose.model('department', projectSchema);

export default Project;