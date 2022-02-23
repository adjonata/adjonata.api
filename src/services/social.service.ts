import SocialModel from "../models/social.model";

export interface SocialCreateBody {
  title: string;
  image?: string;
  link: string;
}

export default {
  create(body: SocialCreateBody) {
    return SocialModel.create(body);
  },
  edit(id: string, body: SocialCreateBody) {
    return SocialModel.findOneAndUpdate({ _id: id }, body);
  },
  delete(id: string) {
    return SocialModel.findOneAndDelete({ _id: id });
  },
  list() {
    return SocialModel.find();
  }
};
