import { Link } from "react-router-dom";

import { ThemeToggleButton } from "@/shared/components/ThemeToggleButton";

import { useLogin } from "../hooks/useLogin";

export const SignInPage = () => {
  const { register, handleSubmit, onSubmit, isPending } = useLogin();

  return (
    <div className="bg-blue-chill-200 dark:bg-dark-100 h-svh text-blue-chill-50">
      <div className="flex items-center justify-center h-full max-w-(--breakpoint-sm) mx-auto ">
        <form className="form bg__color" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-xs font-bold tracking-wide uppercase"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="input__standard bg-blue-chill-50 dark:bg-zinc-50 dark:text-zinc-700 text-blue-chill-700"
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email")}
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-xs font-bold tracking-wide uppercase"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="input__standard bg-blue-chill-50 dark:bg-zinc-50 dark:text-zinc-700 text-blue-chill-700 "
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="btn__primary bg-blue-chill-400 dark:bg-zinc-700 cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Log in"}
            </button>
          </div>
          <hr className="my-8" />
          <div className="flex items-center justify-between">
            <h5>
              Don't have an account?
              <Link
                to="#"
                className="ml-2 text-white underline"
                aria-current="page"
              >
                Sign up
              </Link>
            </h5>
            <ThemeToggleButton />
          </div>
        </form>
      </div>
    </div>
  );
};
