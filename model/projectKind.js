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
}, { conlection: 'projectkind' }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } } );

projectKindSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      let console = console.log(err);
    }
  });
  next();
});

const ProjectKind = mongoose.model('Category', projectKindSchema);

export default ProjectKind;