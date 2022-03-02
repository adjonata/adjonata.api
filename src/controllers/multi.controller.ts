import { Request, Response } from "express";
import { StatusCodes } from "../utils/http";

import AboutService from "../services/about.service";
import KnowledgeService from "../services/knowledge.service";
import ExperienceService from "../services/experience.service";
import ProjectService from "../services/project.service";
import SocialService from "../services/social.service";
import LogService from "../services/log.service";

export default {
  async getter(_request: Request, response: Response) {
    try {
      const about = await AboutService.getter();
      const knowledges = await KnowledgeService.list();
      const experiences = await ExperienceService.list();
      const projects = await ProjectService.list();
      const social = await SocialService.list();
      const lastUpdate = await LogService.getLast().then((log) =>
        log ? log.createdIn : null
      );

      return response.status(StatusCodes.SUCCESS).json({
        about,
        knowledges,
        experiences,
        projects,
        social,
        lastUpdate
      });
    } catch (err) {
      return response.status(StatusCodes.SERVER_ERROR).json(err);
    }
  }
};
