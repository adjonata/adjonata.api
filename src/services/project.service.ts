import { ProjectModel, IProject } from "../models";

export default {
  create(body: IProject) {
    return ProjectModel.create(body).then(
      async (doc) => await doc.populate("technologies")
    );
  },
  edit(id: string, body: IProject) {
    return ProjectModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return ProjectModel.findOneAndDelete({ _id: id });
  },
  list() {
    return ProjectModel.find()
      .sort({ spotlight: "desc" })
      .populate("technologies");
  }
};
