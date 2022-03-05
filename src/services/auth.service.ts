import AuthModel, { IAuthDocument } from "../models/auth.model";
import * as crypts from "../utils/crypts";
import * as token from "../utils/token";

export interface UserCrudBody {
  email: string;
  password: string;
}

interface UserTokenInformations {
  id: string;
  email: string;
}

export default {
  create(body: UserCrudBody) {
    return AuthModel.create(body);
  },
  delete(id: string) {
    return AuthModel.findOneAndDelete({
      _id: id
    });
  },
  listUsers() {
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
  validateUserPassword(password: string, user: IAuthDocument) {
    return crypts.compare(password, user.password);
  },
  generateTokenInformations(user: IAuthDocument): UserTokenInformations {
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
