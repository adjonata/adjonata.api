import mongoose, { Schema } from "mongoose";
export interface IExperience {
  company: string;
  description: string;
  office: string;
  technologies: string[];
  startDate: Date;
  endDate: Date | null;
  isCurrently: boolean;
  createdIn?: Date;
}

const ExperencieSchema = new Schema<IExperience>({
  company: String,
  description: String,
  office: String,
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Knowledges"
    }
  ],
  startDate: String,
  endDate: String,
  isCurrently: Boolean,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const ExperienceModel = mongoose.model<IExperience>(
  "Experencies",
  ExperencieSchema
);
