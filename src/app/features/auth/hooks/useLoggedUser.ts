import { useAuthContext } from "../auth.context";

export function useLoggedUser() {
  const { user } = useAuthContext();

  return {
    user,
    isLoggedIn: !!user,
  };
}
