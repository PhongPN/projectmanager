import mongoose from 'mongoose';

const projectStatusSchema = new mongoose.Schema({
  projectStatusName: {
    type: String,
    required: true,
  },
  projectStatusDesciption: {
    type: String,
  },
  projectStatusStatus: {
    type: String,
    required: true,
  },
}, { collection: 'projectstatus' }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

projectStatusSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const ProjectStatus = mongoose.model('projectstatus', projectStatusSchema);

export default ProjectStatus;