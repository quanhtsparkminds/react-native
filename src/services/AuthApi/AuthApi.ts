import { ApiResponse } from "services/Api.types";
import { LoginFormValues } from "types";
import { delay } from "utils";
import * as Types from "./AuthApi.types";
import { api } from "services/Api";
import Config from "react-native-config";

const login = async (
  data: LoginFormValues
): Promise<ApiResponse<Types.TLoginResponse>> => {
  // mock api
  //   return {
  //     data: { accessToken: "" },
  //     message: "Sucesss",
  //     messageCode: "Sucesss",
  //     status: 200,
  //   };
  const response = await api.post<Types.TLoginResponse>("auth/login", data);
  console.log(response);
  await delay(1000);
  return response;
};

export const authApi = { login };
