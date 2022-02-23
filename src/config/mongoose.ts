import mongoose, { ConnectOptions } from "mongoose";

export function connectDB(
  uri: string,
  options?: ConnectOptions,
  callback?: (connection: typeof mongoose) => void
) {
  return mongoose
    .connect(uri, options)
    .then((connection: typeof mongoose) =>
      callback ? callback(connection) : connection
    )
    .catch((error) => {
      console.log(error);
    });
}
