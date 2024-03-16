import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignupForm = () => {
  const signupForm = useForm<SignUpData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit } = signupForm;

  const onSubmit: SubmitHandler<SignUpData> = (signupData) => {
    console.log('------------', signupData);
  };

  return (
    <div className="flex items-center justify-center h-full max-w-screen-sm mx-auto h-100">
      <form className="form bg__color" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex-1 ">
            <label
              className="block mb-2 text-xs font-bold tracking-wide uppercase"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="input__standard"
              id="grid-first-name"
              type="text"
              required
              placeholder="Your First Name"
              {...register('firstName')}
            />
          </div>
          <div className="flex-1">
            <label
              className="block mb-2 text-xs font-bold tracking-wide uppercase"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="input__standard"
              id="grid-last-name"
              type="text"
              required
              placeholder="Your Last Name"
              {...register('lastName')}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-3">
          <div className="w-full">
            <label
              className="block mb-2 text-xs font-bold tracking-wide uppercase"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="input__standard"
              id="grid-email"
              type="email"
              required
              placeholder="Example@email.com"
              {...register('email')}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <label
              className="block mb-2 text-xs font-bold tracking-wide uppercase"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="input__standard"
              id="grid-password"
              type="password"
              required
              placeholder="*********"
              {...register('password')}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn__primary" type="submit">
            Sign Up
          </button>
        </div>
        <hr className="my-8 border" />
        <h5>
          I have an account
          <Link
            to="/login"
            className="ml-2 underline text-blue-chill-950 dark:text-blue-chill-400"
            aria-current="page"
          >
            Log in
          </Link>
        </h5>
      </form>
    </div>
  );
};
