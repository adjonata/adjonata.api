import { KnowledgeModel, IKnowledge } from "../models";

export default {
  create(body: IKnowledge) {
    return KnowledgeModel.create(body);
  },
  edit(id: string, body: IKnowledge) {
    return KnowledgeModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return KnowledgeModel.findOneAndDelete({ _id: id });
  },
  list() {
    return KnowledgeModel.find();
  }
};
