import { Request, Response } from "express";
import { IKnowledge } from "../models";
import { KnowledgeService, LogService } from "../services";
import { createApiMessage, StatusCodes } from "../utils/http";

interface KnowledgeCreateRequest extends Request {
  body: IKnowledge;
}
interface KnowledgeEditRequest extends KnowledgeCreateRequest {
  params: {
    id: string;
  };
}
interface KnowledgeDeleteRequest extends Request {
  params: {
    id: string;
  };
}

export default {
  /**
   * Get all Knowledges
   */
  async getter(_request: Request, response: Response) {
    try {
      const knowledges = await KnowledgeService.list();

      return response.status(StatusCodes.SUCCESS).json(knowledges);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Create Knowledge
   */
  async create(request: KnowledgeCreateRequest, response: Response) {
    try {
      const { link = "", title, image } = request.body;

      const knowledge = await KnowledgeService.create({
        link,
        title,
        image
      });

      await LogService.create({
        message: "Created a new knowledge",
        module: "Knowledge",
        type: "created"
      });

      return response.status(StatusCodes.SUCCESS).json(knowledge);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Edit Knowledge
   */
  async edit(request: KnowledgeEditRequest, response: Response) {
    try {
      const { id } = request.params;
      const { link = "", title, image } = request.body;

      const body = {
        link,
        title,
        image
      };

      return await KnowledgeService.edit(id, body)
        .then(async () => {
          await LogService.create({
            message: "Knowledge has been updated",
            module: "Knowledge",
            type: "updated"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Knowledge has been updated"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Knowledge not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Delete Knowledge
   */
  async delete(request: KnowledgeDeleteRequest, response: Response) {
    try {
      const { id } = request.params;

      return await KnowledgeService.delete(id)
        .then(async () => {
          await LogService.create({
            message: "Knowledge has been deleted",
            module: "Knowledge",
            type: "deleted"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Knowledge has been deleted"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Knowledge not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  }
};
