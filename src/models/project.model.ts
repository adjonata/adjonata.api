import mongoose, { Schema, Document } from "mongoose";

export interface IProject {
  image: string;
  title: string;
  description?: string;
  technologies: string[];
  link: string;
  spotlight: boolean;
  color?: string;
}

export interface IProjectDocument extends IProject, Document {}

const Projects = new Schema<IProjectDocument>({
  image: Schema.Types.String,
  title: Schema.Types.String,
  description: Schema.Types.String,
  technologies: [{ type: Schema.Types.ObjectId, ref: "Knowledges" }],
  link: Schema.Types.String,
  spotlight: Schema.Types.Boolean,
  color: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IProjectDocument>("Projects", Projects);
