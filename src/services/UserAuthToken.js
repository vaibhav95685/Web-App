import { WHITE_LABEL_TOKEN } from "../reducers/Constants";

export const AuthToken = {
  "Access-Control-Allow-Origin": "*",
  "Content-type": "Application/json",
  "x-access-token": `${localStorage.getItem(WHITE_LABEL_TOKEN)}`,
};
