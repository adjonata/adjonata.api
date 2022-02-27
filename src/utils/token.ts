import jwt from "jsonwebtoken";

const dayInSeconds = 60 * 60 * 24 * 1;

const create = (value: object, expiresIn: number = dayInSeconds): string => {
  return jwt.sign(value, String(process.env.SECRET), {
    expiresIn
  });
};

export { create };
