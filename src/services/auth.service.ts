import type { HydratedDocument } from "mongoose";
import { AuthModel, IAuth } from "../models";
import * as crypts from "../utils/crypts";
import * as token from "../utils/token";

type UserTokenInformations = {
  id: string;
  email: string;
};

export default {
  create(body: IAuth) {
    return AuthModel.create(body);
  },
  delete(id: string) {
    return AuthModel.findOneAndDelete({
      _id: id
    });
  },
  list() {
    return AuthModel.find();
  },
  countUsers() {
    return AuthModel.count({}).exec();
  },
  findByEmail(email: string) {
    return AuthModel.findOne({
      email
    });
  },
  generatePassword(password: string): Promise<string> {
    return crypts.generate(password);
  },
  validateUserPassword(password: string, user: IAuth) {
    return crypts.compare(password, user.password);
  },
  generateTokenInformations(
    user: HydratedDocument<IAuth>
  ): UserTokenInformations {
    return {
      id: user.id,
      email: user.email
    };
  },
  generateToken(tokenInformations: UserTokenInformations): string {
    return token.create(tokenInformations);
  },
  registrationIsEnabled() {
    return process.env.ENABLE_REGISTRATION === "true";
  }
};
