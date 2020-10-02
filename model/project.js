import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectKind: {
    type: objectId,
    required: true,
    ref: 'projectkind',
  },
  projectStatus: {
    type: objectId,
    required: true,
    ref: 'projectstatus',
  },
  projectTeckStack: [
    {
      type: objectId,
      required: true,
      ref: 'teckstack',
    },
  ],
  projectEmployee: [
    {
      type: objectId,
      required: true,
      ref: 'employee',
    },
  ],
}, { collection: 'project' }, { timestamps: { createdAt: Date.now(), updatedAt: 'updatedAt' } });

projectSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updatedAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const Project = mongoose.model('project', projectSchema);

export default Project;