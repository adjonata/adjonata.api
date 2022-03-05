import mongoose, { Schema } from "mongoose";

export interface IProject {
  image: string;
  title: string;
  description?: string;
  technologies: string[];
  link: string;
  spotlight: boolean;
  color?: string;
  createdIn?: Date;
}

export const ProjectSchema = new Schema<IProject>({
  image: String,
  title: String,
  description: String,
  technologies: [{ type: Schema.Types.ObjectId, ref: "Knowledges" }],
  link: String,
  spotlight: Boolean,
  color: String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const ProjectModel = mongoose.model<IProject>("Projects", ProjectSchema);
