import { useMutation } from "@tanstack/react-query";
import { authApi } from "services";
import { LoginFormValues } from "types";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return authApi.login(data);
    },
  });
};
