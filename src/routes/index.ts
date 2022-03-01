import { Router } from "express";

import AboutRouter from "./about.routes";
import KnowledgeRouter from "./knowledge.routes";
import ProjectRouter from "./project.routes";
import SocialRouter from "./social.routes";
import MultiRouter from "./multi.routes";
import AuthRouter from "./auth.routes";
import LogRouter from "./log.routes";

const router = Router();

// Health Checker
router.get("/", (request, response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date()
  };

  return response.status(200).send(data);
});

router.use("/about", AboutRouter);
router.use("/knowledge", KnowledgeRouter);
router.use("/project", ProjectRouter);
router.use("/social", SocialRouter);
router.use("/multi", MultiRouter);
router.use("/auth", AuthRouter);
router.use("/log", LogRouter);

export default router;
