import { Request, Response } from "express";
import AboutService, { AboutCreateBody } from "../services/about.service";
import { ApiMessage, StatusCodes } from "../utils/http";

interface AboutCreateRequest extends Request {
  body: AboutCreateBody;
}

export default {
  async getter(_request: Request, response: Response) {
    try {
      const about = await AboutService.getter();

      if (!about) {
        return response.status(StatusCodes.NOT_FOUND).json({
          message: "Not found"
        } as ApiMessage);
      }

      return response.status(StatusCodes.SUCCESS).json(about);
    } catch (error) {
      return response.status(500).json({ message: error } as ApiMessage);
    }
  },

  async create(request: AboutCreateRequest, response: Response) {
    try {
      const { description } = request.body;
      const about = await AboutService.create({ description });

      return response.status(StatusCodes.SUCCESS).json(about);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json({
        message: error
      } as ApiMessage);
    }
  }
};
