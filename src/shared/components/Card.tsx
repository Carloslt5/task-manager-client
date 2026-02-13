type CardProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`flex items-center justify-center p-4 text-center text-white rounded-sm min-h-32 hover:bg-gradient-to-b from-primary-400 to-primary-500 dark:from-neutral-500 dark:to-neutral-700 bg-primary-400 dark:bg-neutral-700 ${className}`}
    >
      {children}
    </div>
  );
};
