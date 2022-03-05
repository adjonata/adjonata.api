import mongoose, { Document, Schema } from "mongoose";
import { IKnowledges } from "./knowledge.model";

export interface IExperience {
  company: string;
  description: string;
  office: string;
  technologies: string[];
  startDate: Date;
  endDate: Date | null;
  isCurrently: boolean;
}

export interface IExperienceDocument extends IExperience, Document {
  createdIn: Date;
}

const Experencie = new Schema<IExperienceDocument>({
  company: Schema.Types.String,
  description: Schema.Types.String,
  office: Schema.Types.String,
  technologies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Knowledges"
    }
  ],
  startDate: Schema.Types.String,
  endDate: Schema.Types.String,
  isCurrently: Schema.Types.Boolean,
  createdIn: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

export default mongoose.model<IExperienceDocument>("Experencies", Experencie);
