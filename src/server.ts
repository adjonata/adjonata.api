import * as dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(__dirname + "/../.env")) {
  dotenv.config({
    path: __dirname + "/../.env"
  });
}

import { connectDB } from "./config/mongoose";
import app from "./app";

let connectionString = "mongodb://localhost:27017/adjonataapi";

if (process.env.CONNECTION) {
  connectionString = process.env.CONNECTION;
}

function createServer(): void {
  const altPort = process.env.NODE_ENV === "production" ? 80 : 8080;
  const port = parseInt(`${process.env.PORT || altPort}`);

  app.listen(port, () => {
    console.log(`Application runing on port ${port}`);
  });
}

connectDB(connectionString, {}, createServer);
