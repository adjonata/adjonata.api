import * as dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(__dirname + "/../.env")) {
  dotenv.config({
    path: __dirname + "/../.env"
  });
}

import mongoose from "mongoose";
import app from "./app";

function createServer(): void {
  const altPort = process.env.NODE_ENV === "production" ? 80 : 8080;
  const port = parseInt(`${process.env.PORT || altPort}`);

  app.listen(port, () => {
    console.log(`Application runing on port ${port}`);
  });
}

let connectionString = "mongodb://localhost:27017/adjonataapi";

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
  .then(createServer)
  .catch((error) => {
    console.log(error);
  });
