import mongoose, { Schema, Document } from "mongoose";

export interface IAbout extends Document {
  description: string;
}

const About = new Schema({
  description: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IAbout>("About", About);
