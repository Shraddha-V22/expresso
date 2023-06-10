import axios from "axios";

export const loginService = (creds) => {
  return axios.post("/api/auth/login", creds);
};

export const signUpService = (creds) => {
  return axios.post("/api/auth/signup", creds);
};
