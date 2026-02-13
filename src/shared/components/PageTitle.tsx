type PageTitleProps = {
  readonly children: React.ReactNode;
  readonly className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const PageTitle = ({
  children,
  className = "",
  ...rest
}: PageTitleProps) => {
  return (
    <h1
      className={`w-full text-4xl font-bold text-primary-600 dark:text-white ${className}`}
      {...rest}
    >
      {children}
    </h1>
  );
};
