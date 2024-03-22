import { useEditing } from '@/hooks/useEditing';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Close, Edit } from './icons';

type EditedTitle = {
  _id?: string;
  title?: string;
};

interface ChangeTitleProps {
  data: Project;
  entityId: string;
  variant?: 'title-page';
  updateEntity?: (entityId: string) => void;
  updateEntityTitle?: (entityId: string, editedContent: EditedTitle) => Promise<void>;
}

export const ChangeTitle = ({
  data: { id, title },
  // entityId,
  variant,
  // updateEntityTitle,
  // updateEntity,
}: ChangeTitleProps) => {
  const { isEditing, handlerEditClick } = useEditing();

  const editContent = useForm({
    defaultValues: {
      id: id,
      title: title,
    },
  });

  const { register, handleSubmit } = editContent;

  const onSubmit: SubmitHandler<EditedTitle> = async (editedContent) => {
    try {
      // await updateEntityTitle(id, editedContent);
      // setEditing(false);
      // updateEntity(entityId);
      console.log('--------', editedContent);
    } catch (error) {
      console.log('error', error);
    }
  };

  const titleClassName =
    variant === 'title-page'
      ? 'title__primary'
      : 'input__standard text-slate-100 dark:text-zinc-100';
  const inputClassName =
    variant === 'title-page' ? 'title__input' : 'input__standard text-slate-700 dark:text-zinc-700';
  const buttonClassName = variant === 'title-page' ? 'p-6' : 'p-2';

  return (
    <article className="flex flex-col w-full">
      <div className="flex items-stretch justify-between w-full gap-2">
        {!isEditing ? (
          <h1 className={titleClassName} onClick={handlerEditClick}>
            {title}
          </h1>
        ) : (
          <form className="flex w-full text-2x " onSubmit={handleSubmit(onSubmit)}>
            <input
              autoFocus
              type="text"
              {...register('title')}
              className={inputClassName}
              placeholder={title}
              required
            />
          </form>
        )}
        <div className="flex items-center justify-center edit-title">
          <button className={`${buttonClassName}`} onClick={handlerEditClick}>
            {!isEditing ? <Edit /> : <Close />}
          </button>
        </div>
      </div>
    </article>
  );
};
