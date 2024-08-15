import { decodeToken } from "./token";

export const checkAuthorization = (header) => {
  if (header.hasOwnProperty("authorization")) {
    let token = decodeToken(header.authorization);
    return token ? true : false;
  }
};