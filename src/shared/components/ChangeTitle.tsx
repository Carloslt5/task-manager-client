import { useForm } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { Ticket } from "@/domains/projects/features/tickets/tickets.type";
import { Todo } from "@/domains/projects/features/todos/todos.types";
import { Project } from "@/domains/projects/projects.type";

import { useEditing } from "../hooks/useEditingHook";

export interface EditContent {
  id: string;
  title: string;
}

interface ChangeTitleProps {
  readonly data: Project | Ticket | Todo;
  readonly variant?: "title-page";
  readonly updateData: (editedContent: EditContent) => void;
}

export const ChangeTitle = ({ data: { id, title }, variant, updateData }: ChangeTitleProps) => {
  const { isEditing, handlerEditClick } = useEditing();

  const editContent = useForm({
    defaultValues: {
      id: id,
      title: title,
    },
  });

  const { register, handleSubmit } = editContent;

  const submitHandler = async (editedContent: EditContent) => {
    updateData(editedContent);
    handlerEditClick();
    return;
  };

  const titleClassName = variant === "title-page" ? "title__primary" : "input__standard ";
  const inputClassName = variant === "title-page" ? "input__primary" : "input__standard ";
  const buttonClassName = variant === "title-page" ? "p-6" : "p-2";

  return (
    <article className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full gap-2 ">
        {!isEditing ? (
          <h1 className={titleClassName} onClick={handlerEditClick}>
            {title}
          </h1>
        ) : (
          <form className="flex w-full text-2xl" onSubmit={handleSubmit(submitHandler)}>
            <input
              autoFocus
              type="text"
              {...register("title")}
              className={inputClassName}
              placeholder={title}
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
};
