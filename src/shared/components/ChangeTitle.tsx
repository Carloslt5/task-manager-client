import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { SubmitHandler, useForm } from "react-hook-form";

import { useEditing } from "../hooks/useEditingHook";
import { Input } from "./Input";
import { PageTitle } from "./PageTitle";

type FormValues = {
  id: string;
  title: string;
};

type ChangeTitleProps<T extends FormValues> = {
  readonly data: T;
  readonly variant?: "title-page";
  readonly updateData: (editedContent: T) => void;
};

export function ChangeTitle<T extends FormValues>({
  data,
  variant,
  updateData,
}: ChangeTitleProps<T>) {
  const { isEditing, handlerEditClick } = useEditing();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: data.id,
      title: data.title,
    },
  });

  const submitHandler: SubmitHandler<FormValues> = async (formData) => {
    updateData({ ...data, title: formData.title });
    handlerEditClick();
  };

  const inputVariant =
    variant === "title-page" ? ("title" as const) : ("standard" as const);
  const buttonClassName = variant === "title-page" ? "p-6" : "p-2";

  return (
    <article className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full gap-2">
        {!isEditing ? (
          variant === "title-page" ? (
            <PageTitle onClick={handlerEditClick}>{data.title}</PageTitle>
          ) : (
            <h1 onClick={handlerEditClick}>{data.title}</h1>
          )
        ) : (
          <form
            className="flex w-full text-2xl"
            onSubmit={handleSubmit(submitHandler)}
          >
            <Input
              autoFocus
              variant={inputVariant}
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter title"
              onBlur={handlerEditClick}
              required
            />
          </form>
        )}
        <div className="flex items-center rounded-sm text-primary-700 hover:bg-primary-200 dark:text-white dark:hover:bg-neutral-500">
          <button className={buttonClassName} onClick={handlerEditClick}>
            {isEditing ? <CloseIcon /> : <EditIcon />}
          </button>
        </div>
      </div>
    </article>
  );
}
