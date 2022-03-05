import mongoose, { Schema } from "mongoose";

export interface IKnowledge {
  link?: string;
  title: string;
  image: string;
  createdIn?: Date;
}

export const KnowledgeSchema = new Schema<IKnowledge>({
  link: String,
  title: String,
  image: String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const KnowledgeModel = mongoose.model<IKnowledge>(
  "Knowledges",
  KnowledgeSchema
);
