import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

import { login } from "../auth.services";

export type LoginFormValue = {
  email: string;
  password: string;
};

export const useLogin = () => {
  // const navigate = useNavigate();

  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = loginForm;

  const onSubmit: SubmitHandler<LoginFormValue> = async (loginData) => {
    await login(loginData);
    // console.log("🚀 --------- userData", userData);
    // navigate("/admin/dashboard");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
