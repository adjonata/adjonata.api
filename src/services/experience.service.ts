import ExperienceModel, { IExperience } from "../models/experience.model";

export interface ExperienceCreateBody extends IExperience {}

export default {
  list() {
    return ExperienceModel.find();
  },
  create(body: ExperienceCreateBody) {
    return ExperienceModel.create(body);
  },
  edit(id: string, body: ExperienceCreateBody) {
    return ExperienceModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return ExperienceModel.findOneAndDelete({ _id: id });
  }
};
