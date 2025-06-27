import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { SubmitHandler, useForm } from "react-hook-form";

import { useEditing } from "../hooks/useEditingHook";

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

  const titleClassName =
    variant === "title-page" ? "title__primary" : "input__standard";
  const inputClassName =
    variant === "title-page" ? "input__primary" : "input__standard";
  const buttonClassName = variant === "title-page" ? "p-6" : "p-2";

  return (
    <article className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full gap-2">
        {!isEditing ? (
          <h1 className={titleClassName} onClick={handlerEditClick}>
            {data.title}
          </h1>
        ) : (
          <form
            className="flex w-full text-2xl"
            onSubmit={handleSubmit(submitHandler)}
          >
            <input
              autoFocus
              type="text"
              {...register("title", { required: true })}
              className={inputClassName}
              placeholder="Enter title"
              onBlur={handlerEditClick}
              required
            />
          </form>
        )}
        <div className="edit__title">
          <button className={buttonClassName} onClick={handlerEditClick}>
            {isEditing ? <CloseIcon /> : <EditIcon />}
          </button>
        </div>
      </div>
    </article>
  );
}
