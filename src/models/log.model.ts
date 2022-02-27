import mongoose, { Schema, Document } from "mongoose";

export enum LogTypes {}
export interface ILog {
  message: string;
  module: string;
  type: "created" | "updated" | "deleted";
}

interface ILogDocument extends Document, ILog {
  createdIn: Date;
}

const Log = new Schema({
  message: Schema.Types.String,
  module: Schema.Types.String,
  type: Schema.Types.String,
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ILogDocument>("Log", Log);
