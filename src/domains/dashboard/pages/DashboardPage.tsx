import { useLoggedUser } from "@/app/features/auth/hooks/useLoggedUser";
import { Card } from "@/shared/components/Card";
import { PageTitle } from "@/shared/components/PageTitle";

export const DashboardPage = () => {
  const { user } = useLoggedUser();

  if (!user) return null;

  return (
    <>
      <header className="py-3">
        <PageTitle>Dashboard</PageTitle>
      </header>

      <Card className="p-6 max-w-md flex-col items-start gap-4">
        <h2 className="text-xl font-semibold">User info</h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <h3 className="text-sm text-white/70 dark:text-neutral-300 w-14 shrink-0">
              Name:
            </h3>
            <p className="font-medium text-sm">{user.name}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="text-sm text-white/70 dark:text-neutral-300 w-14 shrink-0">
              Email:
            </h3>
            <p className="font-medium text-sm">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="text-sm text-white/70 dark:text-neutral-300 w-14 shrink-0">
              Roles:
            </h3>
            <p className="font-medium text-sm capitalize">
              {user.roles.join(", ")}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};
