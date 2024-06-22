import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginFormValue = {
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

  const onSubmit: SubmitHandler<LoginFormValue> = async () =>
    // loginData
    {
      // console.log("🚀 --------- loginData", loginData);
      navigate("/admin/dashboard");
    };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
