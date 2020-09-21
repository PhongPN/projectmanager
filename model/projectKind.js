import mongoose from 'mongoose';

const projectKindSchema = new mongoose.Schema({
  projectKindName: {
    type: String,
    required: true,
  },
  projectKindKeyNumber: {
    type: Number,
    required: true,
  },
  projectKindStatus: {
    type: String,
    required: true,
  },
}, { collection: 'projectkind' }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

projectKindSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const ProjectKind = mongoose.model('projectkind', projectKindSchema);

export default ProjectKind;