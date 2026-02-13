import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 max-w-(--breakpoint-sm) mx-auto px-4 text-center gap-6">
      <h1 className="text-5xl font-extrabold text-primary-600 dark:text-white">
        Kanban Manager
      </h1>
      <p className="text-lg text-primary-800 dark:text-neutral-300">
        Organize your projects with a Kanban board. Drag and drop tickets
        between columns, manage priorities, and track progress with an intuitive
        interface.
      </p>
      <div className="flex items-center gap-3 rounded-sm bg-primary-300/50 dark:bg-neutral-800 px-4 py-2 text-sm text-primary-900 dark:text-neutral-300">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
        Demo mode — all data is mocked locally, no backend required
      </div>
      <Link
        to="/login"
        className="px-8 py-3 text-lg text-white rounded-sm bg-primary-400 dark:bg-neutral-700 hover:bg-primary-400 dark:hover:bg-neutral-800 cursor-pointer"
      >
        Go to Login
      </Link>
    </div>
  );
};
