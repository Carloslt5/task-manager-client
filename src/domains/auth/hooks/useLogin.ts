import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "@/app/contexts/auth.context";
import { login } from "../auth.services";
import { User } from "../auth.types";

export type LoginFormValue = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login: setUser } = useAuthContext();

  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = loginForm;

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response: { data: User }) => {
      setUser(response.data);
      navigate("/admin/dashboard");
    },
  });

  const onSubmit: SubmitHandler<LoginFormValue> = (loginData) => {
    mutate(loginData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isPending,
  };
};
