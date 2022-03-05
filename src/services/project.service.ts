import ProjectModel, { IProject } from "../models/project.model";

export default {
  create(body: IProject) {
    return ProjectModel.create(body).then((doc) =>
      doc.populate("technologies").execPopulate()
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
