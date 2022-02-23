import AboutModel from "../models/about.model";

export interface AboutCreateBody {
  description: string;
}

export default {
  getter() {
    return AboutModel.findOne().sort("-createdIn");
  },
  create(body: AboutCreateBody) {
    return AboutModel.create(body);
  }
};
