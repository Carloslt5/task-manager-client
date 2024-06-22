import { SubmitHandler, useForm } from "react-hook-form";

type LoginFormValue = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit } = loginForm;

  const onSubmit: SubmitHandler<LoginFormValue> = async () =>
    // loginData
    {
      // console.log("🚀 --------- loginData", loginData);
    };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
