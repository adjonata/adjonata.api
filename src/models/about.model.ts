import mongoose, { Schema } from "mongoose";

export interface IAbout {
  description: string;
  createdIn?: Date;
}

export const AboutSchema = new Schema<IAbout>({
  description: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const AboutModel = mongoose.model<IAbout>("About", AboutSchema);
