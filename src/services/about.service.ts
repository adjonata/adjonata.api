import { AboutModel, IAbout } from "../models";

export default {
  list() {
    return AboutModel.findOne().sort("-createdIn");
  },
  create(body: IAbout) {
    return AboutModel.create(body);
  }
};
