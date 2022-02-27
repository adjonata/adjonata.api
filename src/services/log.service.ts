import LogModel, { ILog } from "../models/log.model";

export interface LogCreateBody extends ILog {}

export default {
  create(body: LogCreateBody) {
    return LogModel.create({ ...body, createdIn: new Date() });
  },
  list() {
    return LogModel.find();
  },
  getLast() {
    return LogModel.findOne().sort("-createdIn");
  }
};
