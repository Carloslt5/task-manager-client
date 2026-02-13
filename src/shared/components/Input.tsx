type InputVariant = "standard" | "title" | "auth" | "modal" | "form";
type TextAreaVariant = "standard" | "modal" | "form";

type InputProps = {
  readonly variant?: InputVariant;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = {
  readonly variant?: TextAreaVariant;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const baseClasses =
  "flex items-center w-full px-1 py-2 text-lg rounded-sm focus:bg-primary-50 focus:text-primary-700 dark:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100";

const inputVariantClasses: Record<InputVariant, string> = {
  standard: "",
  title: "py-1 text-4xl font-extrabold text-primary-500",
  auth: "bg-primary-50 dark:bg-neutral-800 dark:text-neutral-100 text-primary-700",
  modal:
    "bg-white/20 dark:bg-white/10 placeholder:text-white/60 dark:placeholder:text-neutral-400",
  form: "bg-primary-50 text-primary-800 dark:text-neutral-700",
};

const textAreaVariantClasses: Record<TextAreaVariant, string> = {
  standard: "",
  modal:
    "bg-white/20 dark:bg-white/10 placeholder:text-white/60 dark:placeholder:text-neutral-400",
  form: "bg-primary-50 text-primary-800 dark:text-neutral-700",
};

export const Input = ({
  variant = "standard",
  className = "",
  ...rest
}: InputProps) => {
  return (
    <input
      className={`${baseClasses} ${inputVariantClasses[variant]} ${className}`}
      {...rest}
    />
  );
};

export const TextArea = ({
  variant = "standard",
  className = "",
  ...rest
}: TextAreaProps) => {
  return (
    <textarea
      className={`${baseClasses} ${textAreaVariantClasses[variant]} ${className}`}
      {...rest}
    />
  );
};
