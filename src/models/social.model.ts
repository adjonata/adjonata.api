import mongoose, { Schema } from "mongoose";

export interface ISocial {
  title: string;
  image?: string;
  link: string;
  createdIn?: Date;
}

const SocialSchema = new Schema<ISocial>({
  title: String,
  image: String,
  link: String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const SocialModel = mongoose.model<ISocial>("Socials", SocialSchema);
