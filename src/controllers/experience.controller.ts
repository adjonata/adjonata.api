import ExperienceService, {
  ExperienceCreateBody
} from "../services/experience.service";
import LogService from "../services/log.service";
import { Request, Response } from "express";
import { createApiMessage, StatusCodes } from "../utils/http";

interface ExperienceCreateRequest extends Request {
  body: ExperienceCreateBody;
}
interface ExperienceEditRequest extends ExperienceCreateRequest {
  params: {
    id: string;
  };
}
interface ExperienceDeleteRequest extends Request {
  params: {
    id: string;
  };
}

export default {
  /**
   * Get all Experiences
   */
  async getter(_request: Request, response: Response) {
    try {
      const experiences = await ExperienceService.list();

      return response.status(StatusCodes.SUCCESS).json(experiences);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Create Experience
   */
  async create(request: ExperienceCreateRequest, response: Response) {
    try {
      const {
        company,
        description,
        office,
        startDate,
        endDate = null,
        isCurrently,
        technologies
      } = request.body;

      const experience = await ExperienceService.create({
        company,
        description,
        office,
        startDate,
        endDate,
        isCurrently,
        technologies
      });

      await LogService.create({
        message: "Created a new experience",
        module: "Experience",
        type: "created"
      });

      return response.status(StatusCodes.SUCCESS).json(experience);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Edit Experience
   */
  async edit(request: ExperienceEditRequest, response: Response) {
    try {
      const { id } = request.params;
      const {
        company,
        description,
        office,
        startDate,
        endDate,
        isCurrently,
        technologies
      } = request.body;

      const body = {
        company,
        description,
        office,
        startDate,
        endDate,
        isCurrently,
        technologies
      };

      return await ExperienceService.edit(id, body)
        .then(async () => {
          await LogService.create({
            message: "Experience has been updated",
            module: "Experience",
            type: "updated"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Experience has been updated"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Experience not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Delete Experience
   */
  async delete(request: ExperienceDeleteRequest, response: Response) {
    try {
      const { id } = request.params;

      return await ExperienceService.delete(id)
        .then(async () => {
          await LogService.create({
            message: "Experience has been deleted",
            module: "Experience",
            type: "deleted"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Experience has been deleted"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Experience not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  }
};
