import { Request, Response } from "express";
import { createApiMessage, StatusCodes } from "../utils/http";
import { ISocial } from "../models";
import { LogService, SocialService } from "../services";

interface SocialCreateRequest extends Request {
  body: ISocial;
}
interface SocialEditRequest extends SocialCreateRequest {
  params: {
    id: string;
  };
}
interface SocialDeleteRequest extends Request {
  params: {
    id: string;
  };
}

export default {
  /**
   * Get all Socials
   */
  async getter(_request: Request, response: Response) {
    try {
      const socials = await SocialService.list();

      return response.status(StatusCodes.SUCCESS).json(socials);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Create Social
   */
  async create(request: SocialCreateRequest, response: Response) {
    try {
      const { link = "", title, image } = request.body;

      const social = await SocialService.create({
        link,
        title,
        image
      });

      await LogService.create({
        message: "Created a new social",
        module: "Social",
        type: "created"
      });

      return response.status(StatusCodes.SUCCESS).json(social);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Edit Social
   */
  async edit(request: SocialEditRequest, response: Response) {
    try {
      const { id } = request.params;
      const { link = "", title, image } = request.body;

      const body = {
        link,
        title,
        image
      };

      return await SocialService.edit(id, body)
        .then(async () => {
          await LogService.create({
            message: "Social has been updated",
            module: "Social",
            type: "updated"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Social has been updated"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Social not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Delete Social
   */
  async delete(request: SocialDeleteRequest, response: Response) {
    try {
      const { id } = request.params;

      return await SocialService.delete(id)
        .then(async () => {
          await LogService.create({
            message: "Social has been deleted",
            module: "Social",
            type: "deleted"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Social has been deleted"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Social not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  }
};
