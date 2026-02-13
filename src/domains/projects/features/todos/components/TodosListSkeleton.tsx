export const TodosListSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="h-8 rounded-sm animate-pulse bg-primary-400/30 dark:bg-neutral-800"
        />
      ))}
    </div>
  );
};
