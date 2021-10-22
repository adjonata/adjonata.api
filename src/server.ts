import * as dotenv from "dotenv";

dotenv.config({
  path: __dirname + "/../.env"
});

import mongoose from "mongoose";
import app from "./app";

let connectionString = "mongodb://localhost:27017/adjonata.api";

if (process.env.NODE_ENV === "production" && process.env.CONNECTION) {
  connectionString = process.env.CONNECTION;
}

mongoose
  .connect(connectionString!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    let port: number = 8081;

    app.listen(port, () => {
      console.log(`Server running on port ${port}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
