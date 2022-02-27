import { Request, Response } from "express";

import AuthService, { UserCrudBody } from "../services/auth.service";
import LogService from "../services/log.service";
import { createApiMessage, StatusCodes } from "../utils/http";

interface AuthRequest extends Request {
  body: UserCrudBody;
}

interface AuthDeleteRequest extends Request {
  params: {
    id: string;
  };
}

export default {
  async getter(_request: Request, response: Response) {
    try {
      const users = await AuthService.listUsers();

      return response.status(StatusCodes.SUCCESS).json(users);
    } catch (error) {
      return response
        .status(StatusCodes.SERVER_ERROR)
        .json(createApiMessage(error));
    }
  },
  async login(request: AuthRequest, response: Response) {
    try {
      const { email: requestEmail, password: requestPassword } = request.body;

      const user = await AuthService.findByEmail(requestEmail);

      if (!user) {
        return response
          .status(StatusCodes.CONFLICT)
          .json(createApiMessage("E-mail not registred"));
      }

      const isValidPassword = await AuthService.validateUserPassword(
        requestPassword,
        user
      );

      if (!isValidPassword) {
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .json(createApiMessage("Invalid credentials"));
      }

      const userTokenInformations = AuthService.generateTokenInformations(user);

      const token = await AuthService.generateToken(userTokenInformations);

      return response.status(StatusCodes.SUCCESS).json({
        authorization: token,
        userInfo: userTokenInformations
      });
    } catch (error) {
      return response
        .status(StatusCodes.SERVER_ERROR)
        .json(createApiMessage(error));
    }
  },

  async register(request: AuthRequest, response: Response) {
    try {
      const registrationIsEnabled = AuthService.registrationIsEnabled();

      if (!registrationIsEnabled) {
        return response
          .status(StatusCodes.FORBIDDEN)
          .json(createApiMessage("Registration is turned OFF"));
      }

      const { email: requestEmail, password: requestPassword } = request.body;

      const existsUserWithEmail = AuthService.findByEmail(requestEmail);

      if (existsUserWithEmail) {
        return response
          .status(StatusCodes.CONFLICT)
          .json(createApiMessage("Email already registered"));
      }

      const passwordHash = await AuthService.generatePassword(requestPassword);

      const user = await AuthService.create({
        email: requestEmail,
        password: passwordHash
      });

      await LogService.create({
        message: "Created a new user",
        module: "Auth",
        type: "created"
      });

      const userTokenInformations = AuthService.generateTokenInformations(user);

      const token = await AuthService.generateToken(userTokenInformations);

      return response.status(StatusCodes.SUCCESS).json({
        authorization: token,
        userInfo: userTokenInformations
      });
    } catch (error) {
      return response
        .status(StatusCodes.SERVER_ERROR)
        .json(createApiMessage(error));
    }
  },

  async delete(request: AuthDeleteRequest, response: Response) {
    try {
      const { id } = request.params;

      const countUsers = await AuthService.countUsers();

      if (countUsers < 2) {
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .json(createApiMessage("Minimum number of registered users!"));
      }

      const isDeleted = await AuthService.delete(id);

      if (isDeleted) {
        await LogService.create({
          message: "A user has been deleted",
          module: "Auth",
          type: "deleted"
        });
        return response
          .status(StatusCodes.SUCCESS)
          .json(createApiMessage("Success in delete"));
      } else {
        return response
          .status(StatusCodes.NOT_FOUND)
          .json(createApiMessage("User not found"));
      }
    } catch (error) {
      return response
        .status(StatusCodes.SERVER_ERROR)
        .json(createApiMessage(error));
    }
  }
};
