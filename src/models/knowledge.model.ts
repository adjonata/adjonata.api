import mongoose, { Schema, Document } from "mongoose";

export interface IKnowledges {
  link?: string;
  title: string;
  image: string;
}

export interface IKnowledgesDocument extends IKnowledges, Document {}

const Knowledges = new Schema<IKnowledgesDocument>({
  link: Schema.Types.String,
  title: Schema.Types.String,
  image: Schema.Types.String,
  createdIn: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

export default mongoose.model<IKnowledgesDocument>("Knowledges", Knowledges);
