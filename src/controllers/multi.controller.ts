import { Request, Response } from "express";

import About from "../models/about.model";
import Knowledges from "../models/knowledge.model";
import Projects from "../models/project.model";
import Social from "../models/social.model";

export default {
  async getter(request: Request, response: Response) {
    try {
      const about = await About.findOne().sort("-createdIn");
      const knowledges = await Knowledges.find();
      const projects = await Projects.find().sort({ spotlight: "desc" });
      const social = await Social.find();

      return response.status(200).json({
        about,
        knowledges,
        projects,
        social
      });
    } catch (err) {
      return response.status(500).json(err);
    }
  }
};
