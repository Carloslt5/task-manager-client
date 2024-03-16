import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type LoginFormValue = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const loginForm = useForm<LoginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit } = loginForm;

  const onSubmit: SubmitHandler<LoginFormValue> = (loginData) => {
    console.log('------------', loginData);
  };

  return (
    <div className="container flex items-center justify-center h-full max-w-screen-sm p-6 mx-auto text-white h-100">
      <form
        className="w-full p-4 mx-auto rounded bg-slate-700 dark:bg-zinc-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <input
            className="p-2 text-slate-800 dark:text-zinc-800 input-standard"
            id="email"
            type="email"
            placeholder="Your Email"
            {...register('email')}
          />
        </div>
        <div className="mb-6">
          <input
            className="p-2 text-slate-800 dark:text-zinc-800 input-standard"
            id="password"
            type="password"
            placeholder="******************"
            {...register('password')}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="w-full btn-form " type="submit">
            Log in
          </button>
        </div>
        <hr className="my-8" />
        <h5>
          Don't have an account?
          <Link to="/signup" className="ml-2 text-primary-color" aria-current="page">
            Sign up
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default LoginForm;
