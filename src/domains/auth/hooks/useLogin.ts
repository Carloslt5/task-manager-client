import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login } from "../auth.services";

export type LoginFormValue = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = loginForm;

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
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
