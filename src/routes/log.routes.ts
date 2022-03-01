import { Router } from "express";
import { verifyJWT } from "../middlewares/auth";
import { verifyRequest } from "../utils/validation";
import LogController from "../controllers/log.controller";

const LogRouter = Router();

LogRouter.get("/", verifyJWT, LogController.list);

export default LogRouter;
