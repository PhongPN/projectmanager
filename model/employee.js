import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const employeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeBirthDay: {
    type: Date,
    required: true,
  },
  employeeNumber: {
    type: Number,
    required: true,
  },
  employeePhone: {
    type: Number,
    required: true,
  },
  employeeAddress: {
    type: String,
    required: true,
  },
  employeeCertificate: {
    type: String,
    required: true,
  },
  employeeForeignlanguage: {
    type: String,
    required: true,
  },
  employeeTechStack: [
    {
      techStackId: {
        type: objectId,
        ref: 'teckstack',
      },
      techStackFrameWork: {
        type: String,
      },
      techStackExperience: {
        type: String,
      },
    },
  ],
  employeeProject: [
    {
      type: objectId,
      ref: 'project',
    },
  ],
}, { collection: 'employee' }, { timestamps: { createdAt: Date.now(), updatedAt: 'updateAt' } });

// employeeSchema.pre('findOneAndUpdate', async function (next) {
//   const docToUpdate = await this.model.findOne(this.getQuery());
//   docToUpdate.updateAt = Date.now();
//   docToUpdate.save(function (err) {
//     if (err) {
//       next(err);
//     }
//   });
//   next();
// });

const Employee = mongoose.model('employee', employeeSchema);

export default Employee;