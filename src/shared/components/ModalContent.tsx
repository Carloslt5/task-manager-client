type ModalContentProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
};

export const ModalContent = ({
  children,
  className = "",
}: ModalContentProps) => {
  return (
    <div
      className={`flex flex-col w-full gap-2 p-6 rounded-sm bg-primary-600 dark:bg-neutral-950 ${className}`}
    >
      {children}
    </div>
  );
};
