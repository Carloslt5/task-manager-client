import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authservices from '../api/auth.actions';

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const navigate = useNavigate();
  const signupForm = useForm<SignUpData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit } = signupForm;

  const onSubmit: SubmitHandler<SignUpData> = async (signupData) => {
    await authservices.signup(signupData);
    navigate(`/login`);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
