import mongoose, { Schema, Document } from "mongoose";

export interface ISocial {
  title: string;
  image?: string;
  link: string;
}

export interface ISocialDocument extends Document, ISocial {
  createdIn: Date;
}

const Socials = new Schema<ISocialDocument>({
  title: Schema.Types.String,
  image: Schema.Types.String,
  link: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISocialDocument>("Socials", Socials);
