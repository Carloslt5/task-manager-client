import axios from "axios";

import { getEndpoint } from "@/app/api";

import { LoginFormValue } from "./hooks/useLogin";

export async function login(loginData: LoginFormValue) {
  const res = await axios.post(getEndpoint() + "/auth/login", loginData);
  return res.data;
}
