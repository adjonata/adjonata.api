import { Request, Response } from "express";
import { StatusCodes } from "../utils/http";

import AboutService from "../services/about.service";
import KnowledgeService from "../services/knowledge.service";
import ProjectService from "../services/project.service";
import SocialService from "../services/social.service";

export default {
  async getter(_request: Request, response: Response) {
    try {
      const about = await AboutService.getter();
      const knowledges = await KnowledgeService.list();
      const projects = await ProjectService.list();
      const social = await SocialService.list();

      return response.status(StatusCodes.SUCCESS).json({
        about,
        knowledges,
        projects,
        social
      });
    } catch (err) {
      return response.status(StatusCodes.SERVER_ERROR).json(err);
    }
  }
};
