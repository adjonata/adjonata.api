import { Request, Response } from "express";
import { LogService } from "../services";
import { StatusCodes } from "../utils/http";

export default {
  async list(_request: Request, response: Response) {
    try {
      const logs = await LogService.list();
      return response.status(StatusCodes.SUCCESS).json(logs);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  }
};
