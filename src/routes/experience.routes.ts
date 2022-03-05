import { Router } from "express";

import ExperienceController from "../controllers/experience.controller";
import ExperienceValidation from "../validation/experience.valid";
import { verifyRequest } from "../utils/validation";
import { verifyJWT } from "../middlewares/auth";

const ExperienceRouter = Router();

ExperienceRouter.get("/", ExperienceController.getter);
ExperienceRouter.post(
  "/",
  verifyJWT,
  ExperienceValidation.create,
  verifyRequest,
  ExperienceController.create
);
ExperienceRouter.put(
  "/:id",
  verifyJWT,
  ExperienceValidation.edit,
  verifyRequest,
  ExperienceController.edit
);
ExperienceRouter.delete(
  "/:id",
  verifyJWT,
  ExperienceValidation.delete,
  verifyRequest,
  ExperienceController.delete
);

export default ExperienceRouter;
