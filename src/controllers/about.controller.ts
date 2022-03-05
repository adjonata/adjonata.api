import { Request, Response } from "express";
import { IAbout } from "../models";
import { AboutService, LogService } from "../services";
import { createApiMessage, StatusCodes } from "../utils/http";

interface AboutCreateRequest extends Request {
  body: IAbout;
}

export default {
  async getter(_request: Request, response: Response) {
    try {
      const about = await AboutService.list();

      if (!about) {
        return response
          .status(StatusCodes.NOT_FOUND)
          .json(createApiMessage("Not found"));
      }

      return response.status(StatusCodes.SUCCESS).json(about);
    } catch (error) {
      return response.status(500).json(createApiMessage(error));
    }
  },

  async create(request: AboutCreateRequest, response: Response) {
    try {
      const { description } = request.body;
      const about = await AboutService.create({ description }).then(
        async (response) => {
          await LogService.create({
            message: "Created a new user about",
            module: "About",
            type: "created"
          });
          return response;
        }
      );

      return response.status(StatusCodes.SUCCESS).json(about);
    } catch (error) {
      return response
        .status(StatusCodes.SERVER_ERROR)
        .json(createApiMessage(error));
    }
  }
};
