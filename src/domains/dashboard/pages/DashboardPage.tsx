import { useLoggedUser } from "@/app/features/auth/hooks/useLoggedUser";

export const DashboardPage = () => {
  const { user } = useLoggedUser();

  if (!user) return null;

  return (
    <>
      <header className="py-3">
        <h1 className="title__primary">Dashboard</h1>
      </header>

      <div className="card__primary p-6 max-w-md flex flex-col items-start gap-4">
        <h2 className="text-xl font-semibold">User Info</h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <h3 className="text-sm text-gray-500 dark:text-gray-300 w-14 shrink-0">
              Name:
            </h3>
            <p className="font-medium text-sm">{user.name}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="text-sm text-gray-500 dark:text-gray-300 w-14 shrink-0">
              Email:
            </h3>
            <p className="font-medium text-sm">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="text-sm text-gray-500 dark:text-gray-300 w-14 shrink-0">
              Roles:
            </h3>
            <p className="font-medium text-sm capitalize">
              {user.roles.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
