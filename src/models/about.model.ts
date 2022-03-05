import mongoose, { Schema, Document } from "mongoose";

export interface IAbout {
  description: string;
}

export interface IAboutDocument extends Document, IAbout {}

const About = new Schema<IAboutDocument>({
  description: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IAboutDocument>("About", About);
