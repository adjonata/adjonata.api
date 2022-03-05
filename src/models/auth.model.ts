import mongoose, { Schema, Document } from "mongoose";

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthDocument extends Document, IAuth {}

const Auth = new Schema<IAuthDocument>({
  email: Schema.Types.String,
  password: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IAuthDocument>("Auth", Auth);
