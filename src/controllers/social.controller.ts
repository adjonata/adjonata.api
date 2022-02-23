import SocialService, { SocialCreateBody } from "../services/social.service";
import { Request, Response } from "express";
import { createApiMessage, StatusCodes } from "../utils/http";

interface SocialCreateRequest extends Request {
  body: SocialCreateBody;
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
        .then(() =>
          response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Social has been updated"))
        )
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
        .then(() =>
          response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Social has been deleted"))
        )
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
