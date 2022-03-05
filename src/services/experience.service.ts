import { ExperienceModel, IExperience } from "../models";

export default {
  list() {
    return ExperienceModel.find().populate("technologies");
  },
  create(body: IExperience) {
    return ExperienceModel.create(body).then(
      async (doc) => await doc.populate("technologies")
    );
  },
  edit(id: string, body: IExperience) {
    return ExperienceModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return ExperienceModel.findOneAndDelete({ _id: id });
  }
};
