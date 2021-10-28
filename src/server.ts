import * as dotenv from "dotenv";

dotenv.config({
  path: __dirname + "/../.env"
});

import https from "https";
import mongoose from "mongoose";
import app from "./app";
import fs from "fs";
import path from "path";

function createServer(): void {
  const port = parseInt(process.env.PRODUCTION_PORT);

  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem"))
    },
    app
  );

  httpsServer.listen(port, () => {
    console.log(`Https server running on port ${port}!`);
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
