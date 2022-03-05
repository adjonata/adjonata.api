import mongoose, { Schema, Document } from "mongoose";

export enum LogTypes {}
export interface ILog {
  message: string;
  module: string;
  type: "created" | "updated" | "deleted";
}

export interface ILogDocument extends Document, ILog {}

const Log = new Schema<ILogDocument>({
  message: Schema.Types.String,
  module: Schema.Types.String,
  type: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ILogDocument>("Log", Log);
