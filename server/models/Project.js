import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    documents: {
      type: [String],
      default: [],
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    requiredExperience: {
      type: String,
      default: '',
      trim: true,
    },
    requiredMembers: {
      type: Number,
      default: 1,
      min: [1, 'At least 1 member is required'],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: [true, 'Project deadline is required'],
    },
    status: {
      type: String,
      enum: ['Planning', 'Recruiting', 'In Progress', 'Completed'],
      default: 'Planning',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
