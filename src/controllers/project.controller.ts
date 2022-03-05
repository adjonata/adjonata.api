import { Request, Response } from "express";
import { createApiMessage, StatusCodes } from "../utils/http";
import { IProject } from "../models/project.model";
import { LogService, ProjectService } from "../services";

interface ProjectCreateRequest extends Request {
  body: IProject;
}
interface ProjectEditRequest extends ProjectCreateRequest {
  params: {
    id: string;
  };
}
interface ProjectDeleteRequest extends Request {
  params: {
    id: string;
  };
}

export default {
  /**
   * Get all Projects
   */
  async getter(_request: Request, response: Response) {
    try {
      const projects = await ProjectService.list();

      return response.status(StatusCodes.SUCCESS).json(projects);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Create Project
   */
  async create(request: ProjectCreateRequest, response: Response) {
    try {
      const {
        image,
        link,
        spotlight,
        title,
        color = "#89eb34",
        description = "",
        technologies
      } = request.body;

      const project = await ProjectService.create({
        image,
        link,
        spotlight,
        title,
        color,
        description,
        technologies
      });

      await LogService.create({
        message: "Created a new project",
        module: "Project",
        type: "created"
      });

      return response.status(StatusCodes.SUCCESS).json(project);
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Edit Project
   */
  async edit(request: ProjectEditRequest, response: Response) {
    try {
      const { id } = request.params;
      const {
        image,
        link,
        spotlight,
        title,
        color = "#89eb34",
        description = "",
        technologies
      } = request.body;

      const body = {
        image,
        link,
        spotlight,
        title,
        color,
        description,
        technologies
      };

      return await ProjectService.edit(id, body)
        .then(async () => {
          await LogService.create({
            message: "Project has been updated",
            module: "Project",
            type: "updated"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Project has been updated"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Project not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  },

  /**
   * Delete Project
   */
  async delete(request: ProjectDeleteRequest, response: Response) {
    try {
      const { id } = request.params;

      return await ProjectService.delete(id)
        .then(async () => {
          await LogService.create({
            message: "Project has been deleted",
            module: "Project",
            type: "deleted"
          });

          return response
            .status(StatusCodes.SUCCESS)
            .json(createApiMessage("Project has been deleted"));
        })
        .catch(() =>
          response
            .status(StatusCodes.NOT_FOUND)
            .json(createApiMessage("Project not found"))
        );
    } catch (error) {
      return response.status(StatusCodes.SERVER_ERROR).json(error);
    }
  }
};
