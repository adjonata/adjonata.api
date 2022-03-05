import { Request, Response } from "express";
import {
  AboutService,
  ExperienceService,
  KnowledgeService,
  LogService,
  ProjectService,
  SocialService
} from "../services";
import { StatusCodes } from "../utils/http";

export default {
  async getter(_request: Request, response: Response) {
    try {
      const about = await AboutService.list();
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
