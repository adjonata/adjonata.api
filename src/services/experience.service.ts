import ExperienceModel, { IExperience } from "../models/experience.model";

export interface ExperienceCreateBody extends IExperience {}

export default {
  list() {
    return ExperienceModel.find().populate("technologies");
  },
  create(body: ExperienceCreateBody) {
    return ExperienceModel.create(body).then(
      async (doc) => await doc.populate("technologies").execPopulate()
    );
  },
  edit(id: string, body: ExperienceCreateBody) {
    return ExperienceModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return ExperienceModel.findOneAndDelete({ _id: id });
  }
};
