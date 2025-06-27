import type React from "react";

import { useEditing } from "@/shared/hooks/useEditingHook";

import { useTicketForm } from "../hooks/useTicketForm";
import type { Ticket } from "../tickets.type";

type Props = {
  readonly data: Ticket;
};

export const ChangeDetails: React.FC<Props> = ({ data }) => {
  const { isEditing, handlerEditClick } = useEditing();

  const { register, handleSubmit, submitHandler } = useTicketForm({
    stateId: data.stateId,
    projectId: data.projectId,
    ticket: data,
    onClose: handlerEditClick,
  });

  return (
    <>
      {!isEditing ? (
        <article className="p-2 text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800">
          <p onClick={handlerEditClick}>{data.description}</p>
        </article>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <textarea
            autoFocus
            className="p-2 mb-2 text-base border-none max-h-40 input__standard dark:text-zinc-700 "
            placeholder={data.description}
            {...register("description")}
            required
          />

          <section className="flex flex-row-reverse items-center justify-start w-full gap-3">
            <button type="submit" className="btn btn__add ">
              Save Description
            </button>
            <button className="btn btn__cancel" onClick={handlerEditClick}>
              Cancel
            </button>
          </section>
        </form>
      )}
    </>
  );
};
