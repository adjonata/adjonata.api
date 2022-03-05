import mongoose, { Document, Schema } from "mongoose";

export interface IExperience {
  company: string;
  description: string;
  office: string;
  technologies: string[];
  startDate: Date;
  endDate: Date | null;
  isCurrently: boolean;
}

interface IExperienceDocument extends IExperience, Document {}

const Experencie = new Schema({
  company: Schema.Types.String,
  description: Schema.Types.String,
  office: Schema.Types.String,
  technologies: Schema.Types.Array,
  startDate: Schema.Types.String,
  endDate: Schema.Types.String,
  isCurrently: Schema.Types.Boolean,
  createdIn: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

export default mongoose.model<IExperienceDocument>("Experencie", Experencie);
