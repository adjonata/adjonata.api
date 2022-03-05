import { SocialModel, ISocial } from "../models";

export default {
  create(body: ISocial) {
    return SocialModel.create(body);
  },
  edit(id: string, body: ISocial) {
    return SocialModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return SocialModel.findOneAndDelete({ _id: id });
  },
  list() {
    return SocialModel.find();
  }
};
