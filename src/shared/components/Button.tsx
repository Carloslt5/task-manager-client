type ButtonProps = {
  readonly variant?: "primary" | "add" | "cancel" | "danger";
  readonly children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "text-white bg-primary-600 dark:bg-neutral-800 hover:bg-primary-400 dark:hover:bg-neutral-800",
  add: "text-white bg-primary-500 dark:bg-neutral-700 hover:bg-primary-400 dark:hover:bg-neutral-800",
  cancel:
    "text-white border hover:border-red-500 hover:text-red-500 dark:border-neutral-600 dark:hover:border-red-500 dark:hover:text-red-400",
  danger: "text-white bg-red-500 hover:bg-red-700",
};

export const Button = ({
  variant = "add",
  children,
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center flex-1 px-4 py-2 rounded-sm ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
