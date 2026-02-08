import { useAuthContext } from "@/app/contexts/auth.context";

export function useLoggedUser() {
  const { user } = useAuthContext();

  return {
    user,
    isLoggedIn: !!user,
  };
}
