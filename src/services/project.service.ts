import ProjectModel from "../models/project.model";

export interface ProjectCreateBody {
  image: string;
  title: string;
  description?: string;
  link: string;
  spotlight: boolean;
  color?: string;
}

export default {
  create(body: ProjectCreateBody) {
    return ProjectModel.create(body);
  },
  edit(id: string, body: ProjectCreateBody) {
    return ProjectModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return ProjectModel.findOneAndDelete({ _id: id });
  },
  list() {
    return ProjectModel.find().sort({ spotlight: "desc" });
  }
};
