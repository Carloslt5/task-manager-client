import { Link } from "react-router-dom";

import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";

import { useLogin } from "../hooks/useLogin";

export const SignInPage = () => {
  const { register, handleSubmit, onSubmit, isPending } = useLogin();

  return (
    <div className="flex items-center justify-center flex-1 w-full max-w-(--breakpoint-sm) mx-auto">
      <form
        className="w-full p-4 mx-auto rounded-sm bg-primary-600 dark:bg-neutral-950"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-xs font-bold tracking-wide uppercase text-primary-50 dark:text-neutral-100"
            htmlFor="grid-email"
          >
            Email
          </label>
          <Input
            variant="auth"
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email")}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-xs font-bold tracking-wide uppercase text-primary-50 dark:text-neutral-100"
            htmlFor="grid-password"
          >
            Password
          </label>
          <Input
            variant="auth"
            id="password"
            type="password"
            placeholder="******************"
            {...register("password")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="primary"
            className="bg-primary-400 dark:bg-neutral-700 cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </div>
        <hr className="my-8" />
        <div className="flex items-center justify-between">
          <h5 className="text-primary-50 dark:text-neutral-100">
            Don't have an account?
            <Link
              to="#"
              className="ml-2 text-white underline"
              aria-current="page"
            >
              Sign up
            </Link>
          </h5>
        </div>
      </form>
    </div>
  );
};
