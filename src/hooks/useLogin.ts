import authservices from '@/services/auth.services';
import { useAuthStore } from '@/store/authStore';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormValue = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit } = loginForm;

  const onSubmit: SubmitHandler<LoginFormValue> = async (loginData) => {
    const { data } = await authservices.login(loginData);
    setToken(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
