import mongoose, { Schema } from "mongoose";

export interface IAuth {
  email: string;
  password: string;
  createdIn?: Date;
}

export const AuthSchema = new Schema<IAuth>({
  email: Schema.Types.String,
  password: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);
