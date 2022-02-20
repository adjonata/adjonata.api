import About, { IAbout } from "../models/about.model";

export interface AboutCreateBody {
  description: string;
}

export default {
  getter() {
    return About.findOne().sort("-createdIn");
  },
  create(body: AboutCreateBody) {
    return About.create(body);
  }
};
