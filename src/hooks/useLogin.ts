import authservices from '@/services/auth.services';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormValue = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit } = loginForm;

  const onSubmit: SubmitHandler<LoginFormValue> = async (loginData) => {
    const data = await authservices.login(loginData);
    console.log('🚀 --------- data', data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
