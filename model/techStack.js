import mongoose from 'mongoose';

const techStackSchema = new mongoose.Schema({
  techStackName: {
    type: String,
    required: true,
  },
  techStackDesciption: {
    type: String,
  },
  techStackStatus: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
  },

}, { collection: 'teckstack' }, { timestamps: { createdAt: Date.now(), updatedAt: 'updatedAt' } });

techStackSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  docToUpdate.updateAt = Date.now();
  docToUpdate.save(function (err) {
    if (err) {
      next(err);
    }
  });
  next();
});

const TechStack = mongoose.model('teckstack', techStackSchema);

export default TechStack;