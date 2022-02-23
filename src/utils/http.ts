export enum StatusCodes {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export interface ApiMessage {
  msg: unknown;
}

export function createApiMessage(value: unknown): ApiMessage {
  return {
    msg: value
  };
}
