import KnowledgeModel from "../models/knowledge.model";

export interface KnowledgeCreateBody {
  link?: string;
  title: string;
  image: string;
}

export default {
  create(body: KnowledgeCreateBody) {
    return KnowledgeModel.create(body);
  },
  edit(id: string, body: KnowledgeCreateBody) {
    return KnowledgeModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return KnowledgeModel.findOneAndDelete({ _id: id });
  },
  list() {
    return KnowledgeModel.find();
  }
};
