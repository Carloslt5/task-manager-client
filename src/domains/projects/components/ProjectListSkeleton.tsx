export const ProjectListSkeleton = () => {
  return (
    <section className="grid w-full gap-2 overflow-y-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="min-h-32 rounded-sm animate-pulse bg-primary-400/30 dark:bg-neutral-800"
        />
      ))}
    </section>
  );
};
