import { LogModel, ILog } from "../models";

export default {
  create(body: ILog) {
    return LogModel.create(body);
  },
  list() {
    return LogModel.find();
  },
  getLast() {
    return LogModel.findOne().sort("-createdIn");
  }
};
