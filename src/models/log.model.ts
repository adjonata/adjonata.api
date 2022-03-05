import mongoose, { Schema } from "mongoose";

export interface ILog {
  message: string;
  module: string;
  type: "created" | "updated" | "deleted";
  createdIn?: Date;
}

export const LogSchema = new Schema<ILog>({
  message: { type: String, required: true },
  module: { type: String, required: true },
  type: { type: String, required: true },
  createdIn: {
    type: Date,
    default: Date.now
  }
});

export const LogModel = mongoose.model<ILog>("Logs", LogSchema);
